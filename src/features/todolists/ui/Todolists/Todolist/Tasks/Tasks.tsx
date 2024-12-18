import React from 'react'
import List from '@mui/material/List'
import { Task } from './Task/Task'
import { TasksSkeleton } from '../../../Skeletons/TasksSkeleton/TasksSkeleton'
import { TasksPagination } from '../TaskPagination/TasksPagination'
import { DomainTodolist } from '../../../../lib/types'
import { useTasks } from '../../../../lib/hooks/useTasks'

type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
  const { tasks, setPage, page, totalCount, isLoading } = useTasks(todolist)

  if (isLoading) {
    return <TasksSkeleton />
  }

  return (
    <>
      {tasks?.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {tasks?.map((task) => {
            return <Task key={task.id} task={task} todolist={todolist} />
          })}
        </List>
      )}
      <TasksPagination totalCount={totalCount || 0} page={page} setPage={setPage} />
    </>
  )
}
