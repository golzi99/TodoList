import { applyMiddleware, combineReducers, legacy_createStore, UnknownAction } from "redux"
import { appReducer } from "./app-reducer"
import { TaskActionsType, tasksReducer } from "../features/todolists/model/tasks-reducer"
import { TodolistActionsType, todolistsReducer } from "../features/todolists/model/todolists-reducer"
import { thunk, ThunkAction, ThunkDispatch } from "redux-thunk"

const rootReducer = combineReducers({
  app: appReducer,
  tasks: tasksReducer,
  todolists: todolistsReducer,
})

export const store = legacy_createStore(rootReducer, {}, applyMiddleware(thunk))

export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch
export type AppDispatch = ThunkDispatch<RootState, unknown, UnknownAction>
type AppActionType = TodolistActionsType | TaskActionsType
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AppActionType>
// @ts-ignore
window.store = store
