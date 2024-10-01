import React from 'react';
import {EditableSpan} from './components/EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {TodolistType} from './types/types';
import {useDispatch} from 'react-redux';
import {changeTodoListTitleAC, removeTodolistAC} from './model/todolists-reducer';


type Props = {
    todolist: TodolistType
}

export const TodolistTitle = ({todolist}: Props) => {

    const dispatch = useDispatch()

    const {id, title} = todolist

    const onClickRemoveTodoList = () => {
        dispatch(removeTodolistAC(id))
    }

    const updateTitle = (todoListTitle: string) => {
        dispatch(changeTodoListTitleAC({todolistId: id, title: todoListTitle}))
    }

    return (
        <h3>
            <EditableSpan value={title} updateTitle={updateTitle} maxLength={30}/>
            <IconButton aria-label="delete" onClick={onClickRemoveTodoList}>
                <DeleteIcon/>
            </IconButton>
        </h3>
    );
};
