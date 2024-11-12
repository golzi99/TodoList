import React from "react"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import { DomainTodolist, removeTodolistTC, updateTodolistTitleTC } from "../../../../model/todolists-reducer"
import { useAppDispatch } from "common/hooks"
import styles from "./TodolistTitle.module.css"
import { EditableSpan } from "common/components"

type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const dispatch = useAppDispatch()

  const { id, title, entityStatus } = todolist

  const onClickRemoveTodoList = () => {
    dispatch(removeTodolistTC(id))
  }

  const updateTitle = (todoListTitle: string) => {
    dispatch(updateTodolistTitleTC({ todolistId: id, title: todoListTitle }))
  }

  return (
    <div className={styles.container}>
      <h3>
        <EditableSpan value={title} onChange={updateTitle} disabled={entityStatus === "loading"} />
      </h3>
      <IconButton aria-label="delete" onClick={onClickRemoveTodoList} disabled={entityStatus === "loading"}>
        <DeleteIcon />
      </IconButton>
    </div>
  )
}
