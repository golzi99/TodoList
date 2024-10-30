import React from "react"
import Grid from "@mui/material/Grid2"
import Paper from "@mui/material/Paper"
import { Todolist } from "./Todolist/Todolist"
import { getTheme } from "common/theme"
import { selectThemeMode } from "app/appSelectors"
import { selectTodoLists } from "../../model/todolistsSelectors"
import { useAppSelector } from "common/hooks"

export const Todolists = () => {
  const themeMode = useAppSelector(selectThemeMode)

  const theme = getTheme(themeMode)

  const todolists = useAppSelector(selectTodoLists)

  return (
    <>
      {todolists.map((tl) => {
        return (
          <Grid key={tl.id}>
            <Paper elevation={5} sx={{ border: `1px solid ${theme.palette.primary.main}` }}>
              <Todolist todolist={tl} />
            </Paper>
          </Grid>
        )
      })}
    </>
  )
}
