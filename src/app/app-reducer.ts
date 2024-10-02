import {ThemeMode} from '../common/types/types';

type ChangeThemeActionType = ReturnType<typeof changeThemeAC>

type InitialState = typeof initialState

const initialState = {
    themeMode: 'dark' as ThemeMode,
}

export const appReducer = (state: InitialState = initialState, action: ActionsType): InitialState => {
    switch (action.type) {
        case 'CHANGE_THEME':
            return {...state, themeMode: action.payload.themeMode}
        default:
            return state
    }
}

// Action types
type ActionsType = ChangeThemeActionType

export const changeThemeAC = (themeMode: ThemeMode) => {
    return {
        type: 'CHANGE_THEME',
        payload: {
            themeMode
        }
    } as const
}