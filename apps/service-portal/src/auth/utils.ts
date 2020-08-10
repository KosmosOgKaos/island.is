import { MOCK_AUTH_KEY } from '@island.is/service-portal/constants'
import Cookies from 'js-cookie'
import { JwtPayload } from '../mirage-server/models/jwt-model'

export const sleep = (ms = 0) => {
  return new Promise((r) => setTimeout(r, ms))
}

interface MockToken {
  token: ''
}

export const isAuthenticated = async() => Cookies.get(MOCK_AUTH_KEY)?.length > 0

export const setUserToken = async (
  actorNationalId = '2606862759',
  subjectNationalId = '2606862759',
): Promise<MockToken> => {
  const token = await fetch('/user/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      actorNationalId,
      subjectNationalId,
    }),
  })
  //const expirationTime = new Date(new Date().getTime() + 8 * 60 * 60 * 1000)
  const retToken = await token.json()
 // console.log('Frontend cookie', Cookies.get('refresh_token'))
  //Cookies.set(MOCK_AUTH_KEY, retToken.token, {
   // sameSite: 'lax',
   // expires: expirationTime,
  //})

  return retToken
}

export const renewToken = async (): Promise<MockToken> => {
  const refreshToken: string = Cookies.get(MOCK_AUTH_KEY)
  const token = await fetch('/user/refreshtoken', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      refresh_token : refreshToken
    }),
  })
  console.log('I GOT TOKEN')
  console.log(token);
  //const expirationTime = new Date(new Date().getTime() + 8 * 60 * 60 * 1000)
  const retToken = await token.json()
 // console.log('Frontend cookie', Cookies.get('refresh_token'))
  //Cookies.set(MOCK_AUTH_KEY, retToken.token, {
   // sameSite: 'lax',
   // expires: expirationTime,
  //})

  return retToken
}


export const removeToken = () => {
  Cookies.remove(MOCK_AUTH_KEY)
}
