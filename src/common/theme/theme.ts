import {createTheme} from '@mui/material/styles';
import {ThemeMode} from '../types/types';

export const getTheme = (themeMode: ThemeMode) => {
    return createTheme({
        palette: {
            mode: themeMode === 'light' ? 'light' : 'dark',
            primary: {
                main: '#d06905',
            }
        },
    })
}
