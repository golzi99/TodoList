import React, { ChangeEvent } from "react";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
} from "../../../../../model/tasks-reducer";
import { useAppDispatch } from "common/hooks";
import { TaskProps, TodolistProps } from "common/types/types";
import { getListItemSx } from "./Task.styles";
import { EditableSpan } from "common/components";

type Props = {
  task: TaskProps;
  todolist: TodolistProps;
};

export const Task = ({ task, todolist }: Props) => {
  const dispatch = useAppDispatch();
  const { id: taskId, title, isDone } = task;
  const { id: todolistId } = todolist;

  const removeTaskHandler = () => {
    dispatch(removeTaskAC({ taskId, todolistId }));
  };

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked;
    dispatch(changeTaskStatusAC({ taskId, status, todolistId }));
  };

  const changeTaskTitleHandler = (title: string) => {
    dispatch(changeTaskTitleAC({ taskId, title, todolistId }));
  };

  return (
    <ListItem key={taskId} sx={getListItemSx(isDone)}>
      <Box display={"flex"} alignItems={"center"}>
        <Checkbox checked={isDone} onChange={changeTaskStatusHandler} />
        <EditableSpan value={title} onChange={changeTaskTitleHandler} />
      </Box>
      <IconButton aria-label="delete" onClick={removeTaskHandler}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
};

//создайте файл Task.styles.ts рядом с компонентом Task и перенесите туда необходимые стили
