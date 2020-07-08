import React from 'react'
// import { useHistory, useLocation } from 'react-router-dom'
import { fetchToken } from './../../auth/utils'
import { useStateValue } from './../../stateProvider'
import jwtDecode from 'jwt-decode'
import { useHistory } from 'react-router-dom'
import { Button } from '@island.is/island-ui/core'

interface Subject {
  accountType: string
  email: string
  name: string
  nationalId: string
  phone: string
  scope: string[]
}

interface DecodedJwtToken {
  user: string
  availableSubjects: Subject[]
  id: number
  nationalId: string
}

export const Login = () => {
  const [, dispatch] = useStateValue()
  const history = useHistory()
  const handleLogin = async () => {
    const userData = await fetchToken()
    const decodedToken: DecodedJwtToken = jwtDecode(userData.token)
    dispatch({
      type: 'setUser',
      payload: decodedToken.user,
    })
    history.push('/')
  }
  return (
    <div>
      <Button onClick={handleLogin}>Innskráning</Button>
    </div>
  )
}
