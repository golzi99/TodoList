import React from 'react';
import {Button} from './Button';
import styled from 'styled-components';
import {FlexWrapper} from './FlexWrapper';
import {myTheme} from '../styles/Theme.styled';
import {FilterValues, TaskProps} from '../types/types';

type TodolistProps = {
    title: string,
    tasks: Array<TaskProps>,
    removeTask: (id: number) => void,
    changeFilter: (value: FilterValues) => void
}

export const Todolist = ({title, tasks, removeTask, changeFilter}: TodolistProps) => {

    const tasksList: Array<JSX.Element> = tasks.map((task) => {
        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title} </span>
                <Button title={"x"} onClick={() => {removeTask(task.id)}}/>
            </li>
        )
    })

    return (
        <StyledTodoList direction={'column'} gap={'8px'}>
            <h3>{title}</h3>
            <FlexWrapper gap={'8px'}>
                <input/>
                <Button title={'+'} onClick={() => {console.log("add")}}/>
            </FlexWrapper>
            {tasks.length === 0 ? <p>Тасок нет</p> :
                <ul>
                    {tasksList}
                </ul>
            }
            <FlexWrapper gap={'8px'}>
                <Button title={'All'} onClick={() => changeFilter("all")}/>
                <Button title={'Active'} onClick={() => changeFilter("active")}/>
                <Button title={'Completed'} onClick={() => changeFilter("completed")}/>
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