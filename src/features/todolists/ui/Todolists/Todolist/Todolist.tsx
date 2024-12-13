import React from 'react'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import { Tasks } from './Tasks/Tasks'
import { TodolistTitle } from './TodolistTitle/TodolistTitle'
import { FilterTasksButtons } from './FilterTasksButtons/FilterTasksButtons'
import { AddItemForm } from 'common/components'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import { useCreateTaskMutation } from '../../../api/tasksApi'
import { DomainTodolist } from '../../../api/todolistsApi'

type Props = {
  todolist: DomainTodolist
}

export const Todolist = ({ todolist }: Props) => {
  const { id: todolistId, entityStatus } = todolist
  const [addTask] = useCreateTaskMutation()

  const addNewTask = (title: string) => {
    // dispatch(addTaskTC({ title, todolistId }))
    addTask({ title, todolistId })
  }

  const handleTitleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
  }

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ArrowDownwardIcon />}>
        <div onClick={handleTitleClick}>
          <TodolistTitle todolist={todolist} />
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <AddItemForm addItem={addNewTask} disabled={entityStatus === 'loading'} />
        <Tasks todolist={todolist} />
        <FilterTasksButtons todolist={todolist} />
      </AccordionDetails>
    </Accordion>
  )
}
