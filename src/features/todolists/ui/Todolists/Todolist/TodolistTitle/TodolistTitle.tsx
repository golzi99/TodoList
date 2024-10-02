import React from 'react';
import {EditableSpan} from '../../../../../../common/components/EditableSpan/EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {TodolistType} from '../../../../../../common/types/types';
import {changeTodoListTitleAC, removeTodolistAC} from '../../../../model/todolists-reducer';
import {useAppDispatch} from '../../../../../../common/hooks/useAppDispatch';


type Props = {
    todolist: TodolistType
}

export const TodolistTitle = ({todolist}: Props) => {

    const dispatch = useAppDispatch()

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
