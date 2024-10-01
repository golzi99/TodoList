import React from 'react';
import './App.css';
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {useSelector} from 'react-redux';
import {RootState} from './store';
import {Header} from '../Header';
import {getTheme} from '../common/theme/theme';
import {Main} from '../Main';
import {ThemeMode} from '../types/types';


function App() {
    const themeMode = useSelector<RootState, ThemeMode>(state => state.app.themeMode)

    return (
        <div className="App">
            <ThemeProvider theme={getTheme(themeMode)}>
                <CssBaseline/>
                <Header/>
                <Main/>
            </ThemeProvider>
        </div>
    );
}

export default App;
