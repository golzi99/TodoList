import React, {ChangeEvent} from 'react';
import {Button} from './Button';
import styled from 'styled-components';
import {FlexWrapper} from './FlexWrapper';
import {myTheme} from '../styles/Theme.styled';
import {FilterValuesType, TaskPropsType} from '../types/types';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';

type TodolistProps = {
    todoListId: string
    title: string,
    tasks: Array<TaskPropsType>,
    filter: FilterValuesType,
    removeTask: (id: string, todoListId: string) => void,
    changeFilter: (value: FilterValuesType, todoListId: string) => void,
    addTask: (title: string, todoListId: string) => void,
    changeTaskStatus: (id: string, checked: boolean, todoListId: string) => void,
    removeTodoList: (todoListId: string) => void,
    setNewTitle: (taskId: string, todoListId: string, newTitle: string) => void,
    setNewTitleTodoList: (todolistId: string, title: string) => void
}

export const Todolist = ({
                             todoListId,
                             title,
                             tasks,
                             removeTask,
                             changeFilter,
                             addTask,
                             changeTaskStatus,
                             filter,
                             removeTodoList,
                             setNewTitle,
                             setNewTitleTodoList
                         }: TodolistProps) => {

    const addTaskOnClick = (title: string) => {
        addTask(title, todoListId)
    }

    const removeTaskOnClick = (taskId: string) => {
        removeTask(taskId, todoListId)
    }

    const onChangeStatus = (taskId: string, event: ChangeEvent<HTMLInputElement>) => {
        changeTaskStatus(taskId, event.currentTarget.checked, todoListId)
    }

    const setFilterHandlerCreator = (newFilterValue: FilterValuesType) => () => {
        changeFilter(newFilterValue, todoListId)
    }


    const tasksList: Array<JSX.Element> = tasks.map((task) => {
        const onRemoveHandler = () => removeTaskOnClick(task.id)

        const changeTaskTitle = (title: string) => {
            setNewTitle(task.id, todoListId, title)
        }

        return (
            <li key={task.id}>
                <FlexWrapper gap={'4px'} align={'center'}>
                    <input type="checkbox"
                           checked={task.isDone}
                           onChange={(event) => onChangeStatus(task.id, event)}
                    />
                    <EditableSpan done={task.isDone} value={task.title} reWriteTitle={changeTaskTitle}/>
                    <Button title={'x'} callBack={onRemoveHandler}/>
                </FlexWrapper>
            </li>
        )
    })

    const onClickRemoveTodoList = () => {
        removeTodoList(todoListId)
    }

    const onTitleClick = (todoListTitle: string) => {
        setNewTitleTodoList(todoListId, todoListTitle)
    }

    return (
        <StyledTodoList direction={'column'} gap={'8px'}>
            <FlexWrapper justify={'space-between'}>
                <h3>
                    <EditableSpan value={title} reWriteTitle={onTitleClick} maxLength={30}/>
                </h3>
                <Button title={'X'} callBack={onClickRemoveTodoList}/>
            </FlexWrapper>
            <AddItemForm addItem={addTaskOnClick} maxLength={10}/>
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