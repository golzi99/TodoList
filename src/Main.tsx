import React from 'react';
import Grid from '@mui/material/Grid2';
import {AddItemForm} from './components/AddItemForm';
import {useDispatch} from 'react-redux';
import {addTodolistAC} from './model/todolists-reducer';
import {Todolists} from './Todolists';
import Container from '@mui/material/Container';

export const Main = () => {
    const dispatch = useDispatch()

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
