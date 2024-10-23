import React, { useState } from "react";
import { TodolistProps } from "common/types/types";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Tasks } from "./Tasks/Tasks";
import { TodolistTitle } from "./TodolistTitle/TodolistTitle";
import { addTaskAC } from "../../../model/tasks-reducer";
import { useAppDispatch } from "common/hooks";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons";
import { AddItemForm } from "common/components";

type Props = {
  todolist: TodolistProps;
};

export const Todolist = ({ todolist }: Props) => {
  const dispatch = useAppDispatch();

  const { id: todolistId } = todolist;

  const addNewTask = (title: string) => {
    dispatch(addTaskAC({ title, todolistId }));
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box padding={"10px"} width={"325px"}>
      <Box display={"flex"} justifyContent={"space-between"} margin={"5px"}>
        <TodolistTitle todolist={todolist} />
        <Button
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <ArrowDownwardIcon
            sx={{
              transform: isOpen ? "rotate(180deg)" : 0,
              transition: "transform 0.5s linear",
            }}
          />
        </Button>
      </Box>
      <Box
      // sx={{
      //     maxHeight: isOpen ? '1000px' : 0,
      //     transition: 'max-height 0.5s linear',
      //     overflow: 'hidden'
      // }}
      >
        <AddItemForm addItem={addNewTask} />
        <Tasks todolist={todolist} />
        <FilterTasksButtons todolist={todolist} />
      </Box>
    </Box>
  );
};

// TODO: create close and open state of todolist
