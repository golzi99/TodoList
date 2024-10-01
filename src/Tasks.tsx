import React from 'react';
import List from '@mui/material/List';
import {useSelector} from 'react-redux';
import {RootState} from './app/store';
import {TasksStateType, TodolistType} from './types/types';
import {Task} from './Task';

type Props = {
    todolist: TodolistType
}

export const Tasks = ({todolist}: Props) => {

    const {filter, id} = todolist
    const tasks = useSelector<RootState, TasksStateType>(state => state.tasks)

    let tasksForTodoList = tasks[id]
    if (filter === 'active') {
        tasksForTodoList = tasksForTodoList.filter(t => !t.isDone)
    } else if (filter === 'completed') {
        tasksForTodoList = tasksForTodoList.filter(t => t.isDone)
    }

    const tasksList: Array<JSX.Element> = tasksForTodoList.map((task) => {
        return (
            <Task task={task} todolist={todolist}/>
        )
    })

    return (
        <>
            {tasksForTodoList.length === 0 ? <p>Тасок нет</p> :
                <List>
                    {tasksList}
                </List>
            }
        </>
    );
};
