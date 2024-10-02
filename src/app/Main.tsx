import React from 'react';
import Grid from '@mui/material/Grid2';
import {AddItemForm} from '../common/components/AddItemForm/AddItemForm';
import {addTodolistAC} from '../features/todolists/model/todolists-reducer';
import {Todolists} from '../features/todolists/ui/Todolists/Todolists';
import Container from '@mui/material/Container';
import {useAppDispatch} from '../common/hooks/useAppDispatch';

export const Main = () => {
    const dispatch = useAppDispatch()

    const addTodoList = (todolistTitle: string) => {
        dispatch(addTodolistAC(todolistTitle))
    }

    return (
        <Container fixed>
            <Grid container sx={{p: '30px'}}>
                <AddItemForm addItem={addTodoList} maxLength={30}/>
            </Grid>
            <Grid container spacing={4}>
                <Todolists/>
            </Grid>
        </Container>
    );
};
