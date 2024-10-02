import React from 'react';
import ButtonAppBar from '../Menu/ButtonAppBar';
import {changeThemeAC} from '../../../app/app-reducer';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {useAppSelector} from '../../hooks/useAppSelector';
import {selectThemeMode} from '../../../app/appSelectors';

export const Header = () => {

    const dispatch = useAppDispatch()

    const themeMode = useAppSelector(selectThemeMode)

    const changeModeHandler = () => {
        dispatch(changeThemeAC(themeMode === 'light' ? 'dark' : 'light'))
    }

    return (
        <ButtonAppBar onChange={changeModeHandler}/>
    );
};
