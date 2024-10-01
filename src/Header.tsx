import React from 'react';
import ButtonAppBar from './components/ButtonAppBar';
import {changeThemeAC} from './app/app-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from './app/store';
import {ThemeMode} from './types/types';

export const Header = () => {

    const dispatch = useDispatch()

    const themeMode = useSelector<RootState, ThemeMode>(state => state.app.themeMode)

    const changeModeHandler = () => {
        dispatch(changeThemeAC(themeMode === 'light' ? 'dark' : 'light'))
    }

    return (
        <ButtonAppBar onChange={changeModeHandler}/>
    );
};
