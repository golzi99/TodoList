import { UnknownAction } from 'redux'
import { tasksReducer, tasksSlice } from '../features/todolists/model/tasksSlice'
import { todolistsReducer, todolistsSlice } from '../features/todolists/model/todolistsSlice'
import { ThunkDispatch } from 'redux-thunk'
import { configureStore } from '@reduxjs/toolkit'
import { appReducer, appSlice } from 'app/appSlice'
import { setupListeners } from '@reduxjs/toolkit/query'
import { baseApi } from 'app/baseApi'

export const store = configureStore({
  reducer: {
    [appSlice.name]: appReducer,
    [tasksSlice.name]: tasksReducer,
    [todolistsSlice.name]: todolistsReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
})

setupListeners(store.dispatch) //?

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, unknown, UnknownAction>
// @ts-ignore
window.store = store
