import React, {ChangeEvent} from 'react';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import {EditableSpan} from '../../../../../../../common/components/EditableSpan/EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from '../../../../../model/tasks-reducer';
import {TaskPropsType, TodolistType} from '../../../../../../../common/types/types';
import {getListItemSx} from './Task.styles';
import {useAppDispatch} from '../../../../../../../common/hooks/useAppDispatch';

type Props = {
    task: TaskPropsType
    todolist: TodolistType
}

export const Task = ({task, todolist}: Props) => {
    const dispatch = useAppDispatch()

    const removeTaskHandler = () => {
        dispatch(removeTaskAC({taskId: task.id, todolistId: todolist.id}))
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC({taskId: task.id, status: e.currentTarget.checked, todolistId: todolist.id}))
    }

    const changeTaskTitleHandler = (title: string) => {
        dispatch(changeTaskTitleAC({taskId: task.id, title, todolistId: todolist.id}))
    }

    return (
        <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
            <Box display={'flex'} alignItems={'center'}>
                <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>
                <EditableSpan value={task.title} updateTitle={changeTaskTitleHandler}/>
            </Box>
            <IconButton aria-label="delete" onClick={removeTaskHandler}>
                <DeleteIcon/>
            </IconButton>
        </ListItem>
    );
};

//создайте файл Task.styles.ts рядом с компонентом Task и перенесите туда необходимые стили
