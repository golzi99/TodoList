import React, {ChangeEvent, useState} from 'react';
import {Button} from './Button';
import styled from 'styled-components';
import {FlexWrapper} from './FlexWrapper';
import {myTheme} from '../styles/Theme.styled';
import {FilterValues, TaskProps} from '../types/types';
import {Input} from './Input';

type TodolistProps = {
    title: string,
    tasks: Array<TaskProps>,
    removeTask: (id: string) => void,
    changeFilter: (value: FilterValues) => void,
    addTask: (title: string) => void,
    taskDone: (id: string, checked: boolean) => void
}

export const Todolist = ({title, tasks, removeTask, changeFilter, addTask, taskDone}: TodolistProps) => {

    const [inputTaskTitle, setInputTask] = useState('')

    const addTaskOnClick = () => {
        addTask(inputTaskTitle)
        setInputTask('')
    }

    const removeTaskOnClick = (id: string) => {
        removeTask(id)
    }

    const onChangeCheckedTask = (id: string, event: ChangeEvent<HTMLInputElement>) => {
        taskDone(id, event.currentTarget.checked)
    }

    const onAllClickHandler = () => changeFilter('all')
    const onActiveClickHandler = () => changeFilter('active')
    const oCompletedClickHandler = () => changeFilter('completed')

    const tasksList: Array<JSX.Element> = tasks.map((task) => {
        const onRemoveHandler = () => removeTaskOnClick(task.id)

        return (
            <li key={task.id}>
                <input type="checkbox"
                       checked={task.isDone}
                       onChange={(event) => onChangeCheckedTask(task.id, event)}
                />
                <span>{task.title} </span>
                <Button title={'x'} callBack={onRemoveHandler}/>
            </li>
        )
    })

    return (
        <StyledTodoList direction={'column'} gap={'8px'}>
            <h3>{title}</h3>
            <FlexWrapper gap={'8px'}>
                <Input title={inputTaskTitle} setTitle={setInputTask} onEnter={addTaskOnClick}/>
                <Button title={'+'} callBack={addTaskOnClick}
                        disabled={(!inputTaskTitle ? true : 10 - inputTaskTitle.length > 0 ? false : 10 - inputTaskTitle.length <= 0)}/>

            </FlexWrapper>
            {!inputTaskTitle && <p>${`Max length task title is 10 charters`}</p>}
            {inputTaskTitle && 10 - inputTaskTitle.length > 0 &&
                <p>${`You have ${10 - inputTaskTitle.length} characters left`}</p>}
            {inputTaskTitle && 10 - inputTaskTitle.length <= 0 &&
                <p>${`You have exceeded your symbol limit`}</p>}
            {tasks.length === 0 ? <p>Тасок нет</p> :
                <ul>
                    {tasksList}
                </ul>
            }
            <FlexWrapper gap={'8px'}>
                <Button title={'All'} callBack={onAllClickHandler}/>
                <Button title={'Active'} callBack={onActiveClickHandler}/>
                <Button title={'Completed'} callBack={oCompletedClickHandler}/>
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