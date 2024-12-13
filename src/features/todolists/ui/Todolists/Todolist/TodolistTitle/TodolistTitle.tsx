import React from 'react'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import styles from './TodolistTitle.module.css'
import { EditableSpan } from 'common/components'
import {
  DomainTodolist,
  todolistsApi,
  useRemoveTodolistMutation,
  useUpdateTodolistTitleMutation,
} from '../../../../api/todolistsApi'
import { RequestStatus } from 'app/appSlice'
import { useAppDispatch } from 'common/hooks'

type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const [removeTodolist] = useRemoveTodolistMutation()
  const [updateTodolistTitle] = useUpdateTodolistTitleMutation()
  const { id, title, entityStatus } = todolist
  const dispatch = useAppDispatch()

  const updateQueryData = (status: RequestStatus) => {
    dispatch(
      todolistsApi.util.updateQueryData('getTodolists', undefined, (state) => {
        const index = state.findIndex((tl) => tl.id === id)
        if (index !== -1) state[index].entityStatus = status
      }),
    )
  }

  const onClickRemoveTodoList = () => {
    updateQueryData('loading')
    removeTodolist(id)
      .unwrap()
      .catch(() => {
        updateQueryData('idle')
      })
  }

  const updateTitle = (title: string) => {
    updateTodolistTitle({ id, title: title })
  }

  return (
    <div className={styles.container}>
      <h3>
        <EditableSpan value={title} onChange={updateTitle} disabled={entityStatus === 'loading'} />
      </h3>
      <IconButton aria-label="delete" onClick={onClickRemoveTodoList} disabled={entityStatus === 'loading'}>
        <DeleteIcon />
      </IconButton>
    </div>
  )
}
