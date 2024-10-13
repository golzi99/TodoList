import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {FilterValuesType, TodolistType} from '../../../../../../common/types/types';
import {changeTodoListFilterAC} from '../../../../model/todolists-reducer';
import {useAppDispatch} from '../../../../../../common/hooks/useAppDispatch';

type Props = {
    todolist: TodolistType,
}

export const FilterTasksButtons = ({todolist}: Props) => {
    const {filter, id: todolistId} = todolist

    const dispatch = useAppDispatch()

    const changeFilterTasksHandler = (newFilterValue: FilterValuesType) => () => {
        dispatch(changeTodoListFilterAC({todolistId, filter: newFilterValue}))
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

//создайте файл FilterTasksButtons.styles.ts рядом с компонентом FilterTasksButtons и перенесите туда необходимые стили