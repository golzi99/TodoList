import React from 'react';
import List from '@mui/material/List';
import {TodolistType} from '../../../../../../common/types/types';
import {Task} from './Task/Task';
import {useAppSelector} from '../../../../../../common/hooks/useAppSelector';
import {selectTasks} from '../../../../model/tasksSelectors';

type Props = {
    todolist: TodolistType
}

export const Tasks = ({todolist}: Props) => {

    const {filter, id} = todolist
    const tasks = useAppSelector(selectTasks)

    let tasksForTodoList = tasks[id]
    if (filter === 'active') {
        tasksForTodoList = tasksForTodoList.filter(t => !t.isDone)
    } else if (filter === 'completed') {
        tasksForTodoList = tasksForTodoList.filter(t => t.isDone)
    }

    return (
        <>
            {tasksForTodoList.length === 0 ? <p>Тасок нет</p> :
                <List>
                    {tasksForTodoList.map((task) => {
                        return (
                            <Task task={task} todolist={todolist}/>
                        )
                    })}
                </List>
            }
        </>
    );
};
