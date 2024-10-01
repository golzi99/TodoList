import React from 'react';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import {Todolist} from './components/Todolist/Todolist';
import {useSelector} from 'react-redux';
import {RootState} from './app/store';
import {ThemeMode, TodolistType} from './types/types';
import {getTheme} from './common/theme/theme';

export const Todolists = () => {

    const themeMode = useSelector<RootState, ThemeMode>(state => state.app.themeMode)

    const theme = getTheme(themeMode)

    const todolists = useSelector<RootState, Array<TodolistType>>(state => state.todolists)

    const todoListsComponent: Array<JSX.Element> = todolists.map((tl) => {
        return (
            <Grid key={tl.id}>
                <Paper elevation={5} sx={{border: `1px solid ${theme.palette.primary.main}`}}>
                    <Todolist todolist={tl}/>
                </Paper>
            </Grid>
        )
    })

    return (
        <>
            {todoListsComponent}
        </>
    )
};
