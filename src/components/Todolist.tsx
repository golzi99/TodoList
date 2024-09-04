import React, {ChangeEvent, useState} from 'react';
import {Button} from './Button';
import styled from 'styled-components';
import {FlexWrapper} from './FlexWrapper';
import {myTheme} from '../styles/Theme.styled';
import {FilterValuesType, TaskPropsType} from '../types/types';
import {Input} from './Input';

type TodolistProps = {
    id: string
    title: string,
    tasks: Array<TaskPropsType>,
    filter: FilterValuesType,
    removeTask: (id: string, todoListId: string) => void,
    changeFilter: (value: FilterValuesType, todoListId: string) => void,
    addTask: (title: string, todoListId: string) => void,
    changeTaskStatus: (id: string, checked: boolean, todoListId: string) => void,
    removeTodoList: (todoListId: string) => void
}

export const Todolist = ({
                             id,
                             title,
                             tasks,
                             removeTask,
                             changeFilter,
                             addTask,
                             changeTaskStatus,
                             filter,
                             removeTodoList
                         }: TodolistProps) => {

    const [inputTaskTitle, setInputTask] = useState('')
    const [inputError, setInputError] = useState(false)

    const inputEmpty = !inputTaskTitle
    const userErrorLengthMessage = inputTaskTitle.length > 10
    const userLengthMessage = `You have ${10 - inputTaskTitle.length} characters left`

    const addTaskOnClick = () => {
        const trimmedTitle = inputTaskTitle.trim()
        if (!inputEmpty && !userErrorLengthMessage && trimmedTitle) {
            addTask(trimmedTitle, id)
        } else {
            setInputError(true)
        }
        setInputTask('')
    }

    const removeTaskOnClick = (taskId: string) => {
        removeTask(taskId, id)
    }

    const onChangeStatus = (taskId: string, event: ChangeEvent<HTMLInputElement>) => {
        changeTaskStatus(taskId, event.currentTarget.checked, id)
    }

    const setFilterHandlerCreator = (newFilterValue: FilterValuesType) => () => {
        changeFilter(newFilterValue, id)
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

    const onClickRemoveTodoList = () => {
        removeTodoList(id)
    }

    return (
        <StyledTodoList direction={'column'} gap={'8px'}>
            <Title>
                {title}
                <Button title={'X'} callBack={onClickRemoveTodoList}/>
            </Title>
            <FlexWrapper gap={'8px'}>
                <Input title={inputTaskTitle} setTitle={setInputTask} onEnter={addTaskOnClick} error={inputError}
                       setInputError={setInputError}/>
                <Button title={'+'} callBack={addTaskOnClick}
                        disabled={inputEmpty || userErrorLengthMessage || inputError}/>
            </FlexWrapper>
            {inputEmpty && !inputError && <p>Max length task title is 10 charters</p>}
            {!inputEmpty && !userErrorLengthMessage && !inputError && <p>{userLengthMessage}</p>}
            {userErrorLengthMessage && !inputError && <ErrorMessage>Task title is to long</ErrorMessage>}
            {inputError && <ErrorMessage>Task title required</ErrorMessage>}
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
  font-weight: ${props => props.done === 'true' ? '' : 'bold'};;
  text-decoration: ${props => props.done === 'true' ? 'line-through' : 'none'};
  opacity: ${props => props.done === 'true' ? 0.5 : 1};
`

const Title = styled.h3`
  display: flex;
  justify-content: space-between;
`