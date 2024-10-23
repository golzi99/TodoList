import React from "react"
import { changeThemeAC } from "app/app-reducer"
import { useAppDispatch } from "common/hooks"
import { useAppSelector } from "common/hooks"
import { selectThemeMode } from "app/appSelectors"
import { ButtonAppBar } from "common/components"

export const Header = () => {
  const dispatch = useAppDispatch()

  const themeMode = useAppSelector(selectThemeMode)

  const changeModeHandler = () => {
    dispatch(changeThemeAC(themeMode === "light" ? "dark" : "light"))
  }

  return <ButtonAppBar onChange={changeModeHandler} />
}
