import React from 'react'
import Grid from '@mui/material/Grid2'
import Container from '@mui/material/Container'
import { addTodolistTC } from '../features/todolists/model/todolists-reducer'
import { Todolists } from '../features/todolists/ui/Todolists/Todolists'
import { AddItemForm } from 'common/components'
import { useAppDispatch } from 'common/hooks'

export const Main = () => {
  const dispatch = useAppDispatch()

  const addTodoList = (todolistTitle: string) => {
    dispatch(addTodolistTC(todolistTitle))
  }

  return (
    <Container fixed>
      <Grid container sx={{ p: '30px' }}>
        <AddItemForm addItem={addTodoList} />
      </Grid>
      <Grid container spacing={4}>
        <Todolists />
      </Grid>
    </Container>
  )
}
