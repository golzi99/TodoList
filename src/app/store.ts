import { UnknownAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { configureStore } from '@reduxjs/toolkit'
import { appReducer, appSlice } from 'app/appSlice'
import { setupListeners } from '@reduxjs/toolkit/query'
import { baseApi } from 'app/baseApi'

export const store = configureStore({
  reducer: {
    [appSlice.name]: appReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
})

setupListeners(store.dispatch) //?

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, unknown, UnknownAction>
// @ts-ignore
window.store = store
