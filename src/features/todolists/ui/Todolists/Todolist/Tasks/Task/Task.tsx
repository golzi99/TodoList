import React, { ChangeEvent } from "react"
import ListItem from "@mui/material/ListItem"
import Box from "@mui/material/Box"
import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import { removeTaskTC, updateTaskTC } from "../../../../../model/tasks-reducer"
import { useAppDispatch } from "common/hooks"
import { getListItemSx } from "./Task.styles"
import { EditableSpan } from "common/components"
import { DomainTodolist } from "../../../../../model/todolists-reducer"
import { DomainTask } from "../../../../../api/tasksApi.types"
import { TaskStatus } from "../../../../../lib/enums"

type Props = {
  task: DomainTask
  todolist: DomainTodolist
}

export const Task = ({ task, todolist }: Props) => {
  const dispatch = useAppDispatch()
  const { id: taskId, title, status } = task
  const { id: todolistId } = todolist

  const removeTaskHandler = () => {
    dispatch(removeTaskTC({ taskId, todolistId }))
  }

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
    dispatch(updateTaskTC({ taskId, domainModel: { status }, todolistId }))
  }

  const changeTaskTitleHandler = (title: string) => {
    dispatch(updateTaskTC({ taskId, domainModel: { title }, todolistId }))
  }

  return (
    <ListItem key={taskId} sx={getListItemSx(status === TaskStatus.Completed)}>
      <Box display={"flex"} alignItems={"center"}>
        <Checkbox checked={status === TaskStatus.Completed} onChange={changeTaskStatusHandler} />
        <EditableSpan value={title} onChange={changeTaskTitleHandler} />
      </Box>
      <IconButton aria-label="delete" onClick={removeTaskHandler}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}

//создайте файл Task.styles.ts рядом с компонентом Task и перенесите туда необходимые стили
