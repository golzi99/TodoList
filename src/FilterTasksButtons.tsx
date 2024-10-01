import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {FilterValuesType, TodolistType} from './types/types';
import {changeTodoListFilterAC} from './model/todolists-reducer';
import {useDispatch} from 'react-redux';

type Props = {
    todolist: TodolistType,
}

export const FilterTasksButtons = ({todolist}: Props) => {
    const { filter, id } = todolist

    const dispatch = useDispatch()

    const changeFilterTasksHandler = (newFilterValue: FilterValuesType) => () => {
        dispatch(changeTodoListFilterAC({todolistId: id, filter: newFilterValue}))
    }

    return (
        <Box display={'flex'} justifyContent={'space-between'} gap={'10px'}>
            <Button variant={filter === 'all' ? 'outlined' : 'text'} color={'success'}
                    onClick={changeFilterTasksHandler('all')}>
                All
            </Button>
            <Button variant={filter === 'active' ? 'outlined' : 'text'} color="error"
                    onClick={changeFilterTasksHandler('active')}>
                Active
            </Button>
            <Button variant={filter === 'completed' ? 'outlined' : 'text'} color="secondary"
                    onClick={changeFilterTasksHandler('completed')}>
                Completed
            </Button>
        </Box>
    );
};
