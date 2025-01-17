import React from 'react'
import Grid from '@mui/material/Grid2'
import Paper from '@mui/material/Paper'
import { Todolist } from './Todolist/Todolist'
import { getTheme } from 'common/theme'
import { useAppSelector } from 'common/hooks'
import { selectThemeMode } from 'app/appSlice'
import { useGetTodolistsQuery } from '../../api/todolistsApi'
import { TodolistSkeleton } from '../Skeletons/TodolistSkeleton/TodolistSkeleton'

export const Todolists = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const theme = getTheme(themeMode)

  const { data: todolists, isLoading } = useGetTodolistsQuery()

  if (isLoading) {
    return (
      <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
        {Array(3)
          .fill(null)
          .map((_, id) => (
            <TodolistSkeleton key={id} />
          ))}
      </div>
    )
  }

  return (
    <>
      {todolists?.map((tl) => {
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
