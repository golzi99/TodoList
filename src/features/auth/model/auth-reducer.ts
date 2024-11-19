import { AppDispatch, AppThunk } from 'app/store'
import { authApi } from '../api/auth-Api'
import { LoginArgs } from '../api/auth-Api.types'
import { setAppStatusAC } from 'app/app-reducer'
import { ResultCode } from '../../todolists/lib/enums'
import { handleServerAppError, handleServerNetworkError } from 'common/utils'
import { clearTodosDataAC } from '../../todolists/model/todolists-reducer'

type InitialStateType = typeof initialState

const initialState = {
  isLoggedIn: false,
  isInitialized: false,
}

export const authReducer = (state: InitialStateType = initialState, action: AuthActionType): InitialStateType => {
  switch (action.type) {
    case 'SET_IS_LOGIN':
      return { ...state, isLoggedIn: action.payload.isLoggedIn }
    case 'SET_IS_INITIALIZED':
      return { ...state, isInitialized: action.payload.isInitialized }
    default:
      return state
  }
}

export type AuthActionType = SetIsLoggedInActionType

type SetIsLoggedInActionType = ReturnType<typeof setIsLoggedInAC> | ReturnType<typeof setIsInitializedAC>

export const setIsLoggedInAC = (isLoggedIn: boolean) => {
  return {
    type: 'SET_IS_LOGIN',
    payload: {
      isLoggedIn,
    },
  } as const
}

export const setIsInitializedAC = (isInitialized: boolean) => {
  return {
    type: 'SET_IS_INITIALIZED',
    payload: {
      isInitialized,
    },
  } as const
}

export const loginTC =
  (data: LoginArgs): AppThunk<Promise<void>> =>
  async (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC('loading'))
    return authApi
      .login(data)
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(setAppStatusAC('succeeded'))
          dispatch(setIsLoggedInAC(true))
          localStorage.setItem('sn-token', res.data.data.token)
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch)
      })
  }

export const logoutTC = (): AppThunk => async (dispatch: AppDispatch) => {
  dispatch(setAppStatusAC('loading'))
  authApi
    .logout()
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatusAC('succeeded'))
        dispatch(setIsLoggedInAC(false))
        localStorage.removeItem('sn-token')
        dispatch(clearTodosDataAC())
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
}

export const initializeAppTC = (): AppThunk => async (dispatch: AppDispatch) => {
  dispatch(setAppStatusAC('loading'))
  authApi
    .me()
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatusAC('succeeded'))
        dispatch(setIsLoggedInAC(true))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
    .finally(() => {
      dispatch(setIsInitializedAC(true))
    })
}
