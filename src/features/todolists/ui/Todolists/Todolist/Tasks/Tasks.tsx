import React, { useEffect } from "react"
import List from "@mui/material/List"
import { Task } from "./Task/Task"
import { selectTasks } from "../../../../model/tasksSelectors"
import { useAppDispatch, useAppSelector } from "common/hooks"
import { DomainTodolist } from "../../../../model/todolists-reducer"
import { TaskStatus } from "../../../../lib/enums"
import { fetchTasksTC } from "../../../../model/tasks-reducer"

type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
  const { filter, id } = todolist
  const tasks = useAppSelector(selectTasks)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTasksTC(id))
  }, [])

  let tasksForTodoList = tasks[id]
  if (filter === "active") {
    tasksForTodoList = tasksForTodoList.filter((t) => t.status === TaskStatus.New)
  } else if (filter === "completed") {
    tasksForTodoList = tasksForTodoList.filter((t) => t.status === TaskStatus.Completed)
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
