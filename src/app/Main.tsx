import React from 'react'
import Grid from '@mui/material/Grid2'
import Container from '@mui/material/Container'
import { Todolists } from '../features/todolists/ui/Todolists/Todolists'
import { AddItemForm } from 'common/components'
import { useAddTodolistMutation } from '../features/todolists/api/todolistsApi'

export const Main = () => {
  const [addTodolist] = useAddTodolistMutation()

  const addTodoList = (todolistTitle: string) => {
    addTodolist(todolistTitle)
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
