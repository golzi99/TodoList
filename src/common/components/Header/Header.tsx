import React from 'react'
import { useAppDispatch } from 'common/hooks'
import { useAppSelector } from 'common/hooks'
import { ButtonAppBar } from 'common/components'
import { changeTheme, selectThemeMode } from 'app/appSlice'

export const Header = () => {
  const dispatch = useAppDispatch()

  const themeMode = useAppSelector(selectThemeMode)

  const changeModeHandler = () => {
    dispatch(changeTheme({ themeMode: themeMode === 'light' ? 'dark' : 'light' }))
  }

  return <ButtonAppBar onChange={changeModeHandler} />
}
