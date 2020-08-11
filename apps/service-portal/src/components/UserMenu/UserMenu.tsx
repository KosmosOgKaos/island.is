import React, { FC, useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import * as styles from './UserMenu.treat'
import { useStore } from '../../store/stateProvider'
import useSubjects from '../../hooks/useSubjects/useSubjects'
import useUserInfo from '../../hooks/useUserInfo/useUserInfo'
import { Box, Icon } from '@island.is/island-ui/core'
import Menu from './Menu/Menu'
import useOutsideClick from '../../hooks/useOutsideClick/useOutsideClick'

const UserMenu: FC<{}> = () => {
  const ref = useRef()
  const [isOpen, setIsOpen] = useState(false)
  const history = useHistory()
  const [{ userInfo }] = useStore()
  const { subjectList } = useSubjects()
  const { tokenExchange, logoutUser } = useUserInfo()

  useOutsideClick(ref, () => setIsOpen(false))

  const handleSelection = async (subjectNationalId: string) => {
    setIsOpen(false)
    await tokenExchange(subjectNationalId)
    history.push('/')
  }

  return (
    <Box position="relative" height="full" ref={ref}>
      <button
        className={styles.wrapper}
        onClick={setIsOpen.bind(null, !isOpen)}
      >
        <div className={styles.avatar} />
        <div className={styles.username}>{userInfo.sub.name}</div>
        <Box marginLeft={3}>
          <Icon type="cheveron" width="10px" height="12px" />
        </Box>
      </button>
      <Menu
      logoutUser={logoutUser}
        isOpen={isOpen}
        userInfo={userInfo}
        onSubjectSelection={handleSelection}
        subjectList={subjectList}
        onCloseMenu={setIsOpen.bind(null, false)}
      />
    </Box>
  )
}

export default UserMenu
