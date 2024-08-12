import React from "react";
import {Button} from "./Button";
import styled from "styled-components";
import {FlexWrapper} from "./FlexWrapper";
import {myTheme} from "../styles/Theme.styled";
import { TaskType } from "../types/types";

type TodolistPropsType = {
    title: string,
    tasks: Array<TaskType>
}

export const Todolist = ({title, tasks}: TodolistPropsType) => {

    const tasksList: Array<JSX.Element> = tasks.map((task, index) => {
        return (
            <li key={index}>
                <input type="checkbox" checked={task.isDone}/> <span>{task.title}</span>
            </li>
        )
    })

    return (
        <StyledTodoList direction={"column"} gap={"8px"}>
            <h3>{title}</h3>
            <FlexWrapper gap={"8px"}>
                <input/>
                <Button title={"+"}/>
            </FlexWrapper>
            <ul>
                {tasksList}
            </ul>
            <FlexWrapper gap={"8px"}>
                <Button title={"All"}/>
                <Button title={"Active"}/>
                <Button title={"Completed"}/>
            </FlexWrapper>
        </StyledTodoList>
    )
}

const StyledTodoList = styled(FlexWrapper)`
  background-color: ${myTheme.colors.lightBlue};
  padding: 8px;
  border: ${myTheme.colors.borderColor} 2px solid;
  border-radius: 16px;
`