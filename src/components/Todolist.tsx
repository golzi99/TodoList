import React, {ChangeEvent} from 'react';
import {Button} from './Button';
import {FilterValuesType, TaskPropsType} from '../types/types';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';

type TodolistProps = {
    todoListId: string
    todoListTitle: string,
    tasks: Array<TaskPropsType>,
    filter: FilterValuesType,

    removeTask: (id: string, todoListId: string) => void,
    addTask: (title: string, todoListId: string) => void,
    changeTaskStatus: (id: string, checked: boolean, todoListId: string) => void,
    updateTitleTask: (taskId: string, todoListId: string, newTitle: string) => void,

    changeFilter: (value: FilterValuesType, todoListId: string) => void,
    removeTodoList: (todoListId: string) => void,
    updateTitleTodoList: (todolistId: string, title: string) => void
}

export const Todolist = ({
                             todoListId,
                             todoListTitle,
                             tasks,
                             removeTask,
                             changeFilter,
                             addTask,
                             changeTaskStatus,
                             filter,
                             removeTodoList,
                             updateTitleTask,
                             updateTitleTodoList
                         }: TodolistProps) => {

    const addTaskOnClick = (title: string) => {
        addTask(title, todoListId)
    }

    const removeTaskOnClick = (taskId: string) => {
        removeTask(taskId, todoListId)
    }

    const setFilterHandlerCreator = (newFilterValue: FilterValuesType) => () => {
        changeFilter(newFilterValue, todoListId)
    }


    const tasksList: Array<JSX.Element> = tasks.map((task) => {
        const onRemoveHandler = () => removeTaskOnClick(task.id)

        const onChangeStatus = (event: ChangeEvent<HTMLInputElement>) => {
            changeTaskStatus(task.id, event.currentTarget.checked, todoListId)
        }

        const changeTaskTitle = (taskTitle: string) => {
            updateTitleTask(task.id, todoListId, taskTitle)
        }

        const tasksClasses: string = task.isDone ? 'task-done' : 'task'

        return (
            <li key={task.id}>
                <input type="checkbox"
                       checked={task.isDone}
                       onChange={onChangeStatus}
                />
                <EditableSpan classes={tasksClasses} value={task.title} updateTitle={changeTaskTitle}/>
                <Button title={'x'} callBack={onRemoveHandler}/>
            </li>
        )
    })

    const onClickRemoveTodoList = () => {
        removeTodoList(todoListId)
    }

    const onTitleClick = (todoListTitle: string) => {
        updateTitleTodoList(todoListId, todoListTitle)
    }

    return (
        <div className="todolist">
            <h3 className={'todolistTitle'}>
                <EditableSpan value={todoListTitle} updateTitle={onTitleClick} maxLength={30}/>
                <Button title={'X'} callBack={onClickRemoveTodoList}/>
            </h3>
            <AddItemForm addItem={addTaskOnClick} maxLength={10}/>
            {tasks.length === 0 ? <p>Тасок нет</p> :
                <ul>
                    {tasksList}
                </ul>
            }
            <div>
                <Button classes={filter === 'all' ? 'filter-btn-active' : ''} title={'All'}
                        callBack={setFilterHandlerCreator('all')}/>
                <Button classes={filter === 'active' ? 'filter-btn-active' : ''} title={'Active'}
                        callBack={setFilterHandlerCreator('active')}/>
                <Button classes={filter === 'completed' ? 'filter-btn-active' : ''} title={'Completed'}
                        callBack={setFilterHandlerCreator('completed')}/>
            </div>
        </div>
    )
}
