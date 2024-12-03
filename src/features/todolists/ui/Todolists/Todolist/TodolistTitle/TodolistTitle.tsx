import React from 'react'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { DomainTodolist } from '../../../../model/todolistsSlice'
import styles from './TodolistTitle.module.css'
import { EditableSpan } from 'common/components'
import { useRemoveTodolistMutation, useUpdateTodolistTitleMutation } from '../../../../api/_todolistsApi'

type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const [removeTodolist] = useRemoveTodolistMutation()
  const [updateTodolistTitle] = useUpdateTodolistTitleMutation()
  const { id, title, entityStatus } = todolist

  const onClickRemoveTodoList = () => {
    removeTodolist(id)
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
