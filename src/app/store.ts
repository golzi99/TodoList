import { applyMiddleware, combineReducers, legacy_createStore, UnknownAction } from 'redux'
import { AppActionsType, appReducer } from './app-reducer'
import { TaskActionsType, tasksReducer } from '../features/todolists/model/tasks-reducer'
import { TodolistActionsType, todolistsReducer } from '../features/todolists/model/todolists-reducer'
import { thunk, ThunkAction, ThunkDispatch } from 'redux-thunk'
import { AuthActionType, authReducer } from '../features/auth/model/auth-reducer'

const rootReducer = combineReducers({
  app: appReducer,
  tasks: tasksReducer,
  todolists: todolistsReducer,
  auth: authReducer,
})

export const store = legacy_createStore(rootReducer, {}, applyMiddleware(thunk))

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, unknown, UnknownAction>
type AppActionType = TodolistActionsType | TaskActionsType | AppActionsType | AuthActionType
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AppActionType>
// @ts-ignore
window.store = store
