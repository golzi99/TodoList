import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useAppDispatch } from 'common/hooks'
import { DomainTodolist, FilterValues, todolistsApi } from '../../../../api/todolistsApi'

type Props = {
  todolist: DomainTodolist
}

export const FilterTasksButtons = ({ todolist }: Props) => {
  const { filter, id: todolistId } = todolist

  const dispatch = useAppDispatch()

  const changeFilterTasksHandler = (newFilterValue: FilterValues) => () => {
    dispatch(
      todolistsApi.util.updateQueryData('getTodolists', undefined, (state) => {
        const index = state.findIndex((tl) => tl.id === todolistId)
        if (index !== -1) state[index].filter = newFilterValue
      }),
    )
  }

  return (
    <Box display={'flex'} gap={'10px'}>
      <Button
        variant={filter === 'all' ? 'outlined' : 'text'}
        color={'success'}
        onClick={changeFilterTasksHandler('all')}
        sx={{
          flexGrow: '1',
        }}
      >
        All
      </Button>
      <Button
        variant={filter === 'active' ? 'outlined' : 'text'}
        color="error"
        onClick={changeFilterTasksHandler('active')}
        sx={{
          flexGrow: '1',
        }}
      >
        Active
      </Button>
      <Button
        variant={filter === 'completed' ? 'outlined' : 'text'}
        color="secondary"
        onClick={changeFilterTasksHandler('completed')}
        sx={{
          flexGrow: '1',
        }}
      >
        Completed
      </Button>
    </Box>
  )
}

//создайте файл FilterTasksButtons.styles.ts рядом с компонентом FilterTasksButtons и перенесите туда необходимые стили
