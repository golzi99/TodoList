import React, { useState } from "react"
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward"
import { Tasks } from "./Tasks/Tasks"
import { TodolistTitle } from "./TodolistTitle/TodolistTitle"
import { addTaskTC } from "../../../model/tasks-reducer"
import { useAppDispatch } from "common/hooks"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons"
import { AddItemForm } from "common/components"
import { DomainTodolist } from "../../../model/todolists-reducer"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"

type Props = {
  todolist: DomainTodolist
}

export const Todolist = ({ todolist }: Props) => {
  const dispatch = useAppDispatch()

  const { id: todolistId } = todolist

  const addNewTask = (title: string) => {
    dispatch(addTaskTC({ title, todolistId }))
  }

  const handleTitleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
  }

  // const [isOpen, setIsOpen] = useState(true)

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ArrowDownwardIcon />}>
        <div onClick={handleTitleClick}>
          <TodolistTitle todolist={todolist} />
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <AddItemForm addItem={addNewTask} />
        <Tasks todolist={todolist} />
        <FilterTasksButtons todolist={todolist} />
      </AccordionDetails>
    </Accordion>
  )
}

//    <Box padding={"10px"} width={"325px"}>
//       <Box display={"flex"} justifyContent={"space-between"} margin={"5px"}>
//         <TodolistTitle todolist={todolist} />
//         <Button
//           onClick={() => {
//             setIsOpen(!isOpen)
//           }}
//         >
//           <ArrowDownwardIcon
//             sx={{
//               transform: isOpen ? "rotate(180deg)" : 0,
//               transition: "transform 0.2s linear",
//             }}
//           />
//         </Button>
//       </Box>
//       <Box
//         sx={{
//           maxHeight: isOpen ? "100vh" : 0,
//           transition: "max-height 0.5s linear",
//           overflow: "hidden",
//           paddingTop: "10px",
//         }}
//       >
//         <AddItemForm addItem={addNewTask} />
//         <Tasks todolist={todolist} />
//         <FilterTasksButtons todolist={todolist} />
//       </Box>
//     </Box>
