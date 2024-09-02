import React, {ChangeEvent, useState} from 'react';
import {Button} from './Button';
import styled from 'styled-components';
import {FlexWrapper} from './FlexWrapper';
import {myTheme} from '../styles/Theme.styled';
import {FilterValuesType, TaskPropsType} from '../types/types';
import {Input} from './Input';

type TodolistProps = {
    title: string,
    tasks: Array<TaskPropsType>,
    filter: FilterValuesType,
    removeTask: (id: string) => void,
    changeFilter: (value: FilterValuesType) => void,
    addTask: (title: string) => void,
    changeTaskStatus: (id: string, checked: boolean) => void
}

export const Todolist = ({
                             title,
                             tasks,
                             removeTask,
                             changeFilter,
                             addTask,
                             changeTaskStatus,
                             filter
                         }: TodolistProps) => {

    const [inputTaskTitle, setInputTask] = useState('')
    const [inputError, setInputError] = useState(false)

    const inputEmpty = !inputTaskTitle
    const userErrorLengthMessage = inputTaskTitle.length > 10
    const userLengthMessage = `You have ${10 - inputTaskTitle.length} characters left`

    const addTaskOnClick = () => {
        if (!inputEmpty && !userErrorLengthMessage && !inputError) {
            addTask(inputTaskTitle.trim())
            setInputTask('')
        }
    }

    const removeTaskOnClick = (id: string) => {
        removeTask(id)
    }

    const onChangeStatus = (id: string, event: ChangeEvent<HTMLInputElement>) => {
        changeTaskStatus(id, event.currentTarget.checked)
    }

    const setFilterHandlerCreator = (newFilterValue: FilterValuesType) => () => {
        changeFilter(newFilterValue)
    }

    const tasksList: Array<JSX.Element> = tasks.map((task) => {
        const onRemoveHandler = () => removeTaskOnClick(task.id)

        return (
            <li key={task.id}>
                <input type="checkbox"
                       checked={task.isDone}
                       onChange={(event) => onChangeStatus(task.id, event)}
                />
                <TaskIsDone done={task.isDone.toString()}> {task.title} </TaskIsDone>
                <Button title={'x'} callBack={onRemoveHandler}/>
            </li>
        )
    })

    return (
        <StyledTodoList direction={'column'} gap={'8px'}>
            <h3>{title}</h3>
            <FlexWrapper gap={'8px'}>
                <Input title={inputTaskTitle} setTitle={setInputTask} onEnter={addTaskOnClick} error={inputError}
                       setInputError={setInputError}/>
                <Button title={'+'} callBack={addTaskOnClick}
                        disabled={inputEmpty || userErrorLengthMessage || inputError}/>
            </FlexWrapper>
            {inputEmpty && <p>Max length task title is 10 charters</p>}
            {!inputEmpty && inputError && <ErrorMessage>Task title required</ErrorMessage>}
            {!inputEmpty && !userErrorLengthMessage && !inputError && <p>{userLengthMessage}</p>}
            {userErrorLengthMessage && !inputError && <ErrorMessage>Task title is to long</ErrorMessage>}
            {tasks.length === 0 ? <p>Тасок нет</p> :
                <ul>
                    {tasksList}
                </ul>
            }
            <FlexWrapper gap={'8px'}>
                <Button activeButton={filter === 'all'} title={'All'} callBack={setFilterHandlerCreator('all')}/>
                <Button activeButton={filter === 'active'} title={'Active'}
                        callBack={setFilterHandlerCreator('active')}/>
                <Button activeButton={filter === 'completed'} title={'Completed'}
                        callBack={setFilterHandlerCreator('completed')}/>
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

const ErrorMessage = styled.p`
  color: red;
`

const TaskIsDone = styled.span<{ done: string }>`
  text-decoration: ${props => props.done === 'true' ? 'line-through' : 'none'};
  opacity: ${props => props.done === 'true' ? 0.5 : 1};
`