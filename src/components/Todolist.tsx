import React, {useState} from 'react';
import {Button} from './Button';
import styled from 'styled-components';
import {FlexWrapper} from './FlexWrapper';
import {myTheme} from '../styles/Theme.styled';
import {FilterValues, TaskProps} from '../types/types';
import {Input} from './Input';

type TodolistProps = {
    title: string,
    tasks: Array<TaskProps>,
    removeTask: (id: number) => void,
    changeFilter: (value: FilterValues) => void,
    addTask: (addedTask: TaskProps) => void,
    taskDone: (id: number) => void
}

export const Todolist = ({title, tasks, removeTask, changeFilter, addTask, taskDone}: TodolistProps) => {

    const [inputTaskTitle, setInputTask] = useState('')

    const addTaskOnClick = () => {
        if (inputTaskTitle.trim()) {
            addTask({
                id: tasks[tasks.length - 1].id + 1,
                isDone: false,
                title: inputTaskTitle
            })
            setInputTask('')
        }
    }

    const tasksList: Array<JSX.Element> = tasks.map((task) => {
        return (
            <li key={task.id}>
                <input type="checkbox"
                       checked={task.isDone}
                       onChange={() => taskDone(task.id)}
                />
                <span>{task.title} </span>
                <Button title={'x'} callBack={() => {
                    removeTask(task.id)
                }}/>
            </li>
        )
    })

    return (
        <StyledTodoList direction={'column'} gap={'8px'}>
            <h3>{title}</h3>
            <FlexWrapper gap={'8px'}>
                <Input title={inputTaskTitle} setTitle={setInputTask}/>
                <Button title={'+'} callBack={() => {
                    addTaskOnClick()
                }}/>
            </FlexWrapper>
            {tasks.length === 0 ? <p>Тасок нет</p> :
                <ul>
                    {tasksList}
                </ul>
            }
            <FlexWrapper gap={'8px'}>
                <Button title={'All'} callBack={() => changeFilter('all')}/>
                <Button title={'Active'} callBack={() => changeFilter('active')}/>
                <Button title={'Completed'} callBack={() => changeFilter('completed')}/>
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