import React from 'react'
import List from '@mui/material/List'
import { Task } from './Task/Task'
import { DomainTodolist } from '../../../../model/todolistsSlice'
import { TaskStatus } from '../../../../lib/enums'
import { useGetTasksQuery } from '../../../../api/tasksApi'

type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
  const { filter, id } = todolist

  const { data } = useGetTasksQuery(id)

  let tasksForTodoList = data?.items
  if (filter === 'active') {
    tasksForTodoList = tasksForTodoList?.filter((t) => t.status === TaskStatus.New)
  } else if (filter === 'completed') {
    tasksForTodoList = tasksForTodoList?.filter((t) => t.status === TaskStatus.Completed)
  }

  return (
    <>
      {tasksForTodoList?.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {tasksForTodoList?.map((task) => {
            return <Task key={task.id} task={task} todolist={todolist} />
          })}
        </List>
      )}
    </>
  )
}
