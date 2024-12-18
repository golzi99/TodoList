import React, { ChangeEvent } from 'react'
import ListItem from '@mui/material/ListItem'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { useAppDispatch } from 'common/hooks'
import { getListItemSx } from './Task.styles'
import { EditableSpan } from 'common/components'
import { DomainTask, UpdateTaskModel } from '../../../../../api/tasksApi.types'
import { TaskStatus } from '../../../../../lib/enums'
import { tasksApi, useRemoveTaskMutation, useUpdateTaskMutation } from '../../../../../api/tasksApi'
import { RequestStatus } from 'app/appSlice'
import { DomainTodolist } from '../../../../../lib/types'

type Props = {
  task: DomainTask
  todolist: DomainTodolist
}

export const Task = ({ task, todolist }: Props) => {
  const dispatch = useAppDispatch()
  const { id: taskId, title, status, entityStatus: TaskEntityStatus } = task
  const { id: todolistId, entityStatus } = todolist

  const [removeTask] = useRemoveTaskMutation()
  const [updateTask] = useUpdateTaskMutation()

  const updateQueryData = (status: RequestStatus) => {
    dispatch(
      tasksApi.util.updateQueryData('getTasks', { todolistId, args: { page: 1 } }, (state) => {
        const index = state.items.findIndex((task) => task.id === taskId)
        if (index !== -1) state.items[index].entityStatus = status
      }),
    )
  }

  const removeTaskHandler = () => {
    // dispatch(removeTaskTC({ taskId, todolistId }))
    updateQueryData('loading')
    removeTask({ taskId, todolistId })
      .unwrap()
      .catch(() => {
        updateQueryData('idle')
      })
  }

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
    const model: UpdateTaskModel = {
      status,
      title: task.title,
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
    }
    // dispatch(updateTaskTC({ task: newTask }))
    updateQueryData('loading')
    updateTask({ model, taskId, todolistId })
      .unwrap()
      .then(() => {
        updateQueryData('succeeded')
      })
      .catch(() => {
        updateQueryData('failed')
      })
  }

  const changeTaskTitleHandler = (title: string) => {
    const model: UpdateTaskModel = {
      status: task.status,
      title,
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
    }
    // dispatch(updateTaskTC({ task: newTask }))
    updateQueryData('loading')
    updateTask({ model, taskId, todolistId })
      .unwrap()
      .then(() => {
        updateQueryData('succeeded')
      })
      .catch(() => {
        updateQueryData('failed')
      })
    //обратите внимание, что в changeTaskStatusHandler и changeTaskTitleHandler модельки создаются похожим образом. Попробуйте избавиться от дублирования кода.
  }

  return (
    <ListItem key={taskId} sx={getListItemSx(status === TaskStatus.Completed)}>
      <Box display={'flex'} alignItems={'center'}>
        <Checkbox
          checked={status === TaskStatus.Completed}
          onChange={changeTaskStatusHandler}
          disabled={entityStatus === 'loading' || TaskEntityStatus === 'loading'}
        />
        <EditableSpan
          value={title}
          onChange={changeTaskTitleHandler}
          disabled={entityStatus === 'loading' || TaskEntityStatus === 'loading'}
        />
      </Box>
      <IconButton
        aria-label="delete"
        onClick={removeTaskHandler}
        disabled={entityStatus === 'loading' || TaskEntityStatus === 'loading'}
      >
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}
