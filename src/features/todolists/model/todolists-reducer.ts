import { Todolist } from '../api/todolistsApi.types'
import { AppDispatch, AppThunk, RootState } from 'app/store'
import { todolistsApi } from '../api/todolistsApi'
import { RequestStatus, setAppStatusAC } from 'app/app-reducer'
import { ResultCode } from '../lib/enums'
import { handleServerAppError } from 'common/utils'
import { handleServerNetworkError } from 'common/utils'
import { fetchTasksTC } from './tasks-reducer'

export type DomainTodolist = Todolist & {
  filter: FilterValues
  entityStatus: RequestStatus
}

export type FilterValues = 'all' | 'active' | 'completed'

const initialState: Array<DomainTodolist> = []

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodoListTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodoListFilterAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
export type ChangeTodolistEntityStatusActionType = ReturnType<typeof changeTodolistEntityStatusAC>
export type ClearTodosDataActionType = ReturnType<typeof clearTodosDataAC>

export type TodolistActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType
  | SetTodolistsActionType
  | ChangeTodolistEntityStatusActionType
  | ClearTodosDataActionType

export const todolistsReducer = (
  state: Array<DomainTodolist> = initialState,
  action: TodolistActionsType,
): Array<DomainTodolist> => {
  switch (action.type) {
    case 'SET-TODOLISTS': {
      return action.todolists.map((tl) => ({ ...tl, filter: 'all', entityStatus: 'idle' }))
    }
    case 'REMOVE_TODOLIST': {
      return state.filter((tl) => tl.id !== action.payload.todolistId)
    }
    case 'ADD_TODOLIST': {
      const newTodoList: DomainTodolist = {
        ...action.payload.todolist,
        filter: 'all',
        entityStatus: 'idle',
      }

      return [newTodoList, ...state]
    }
    case 'CHANGE_TODOLIST_TITLE': {
      return state.map((tl) => (tl.id === action.payload.todolistId ? { ...tl, title: action.payload.title } : tl))
    }
    case 'CHANGE_TODOLIST_FILTER': {
      return state.map((tl) =>
        tl.id === action.payload.todolistId
          ? {
              ...tl,
              filter: action.payload.filter,
            }
          : tl,
      )
    }
    case 'CHANGE-TODOLIST-ENTITY-STATUS': {
      return state.map((tl) =>
        tl.id === action.payload.id ? { ...tl, entityStatus: action.payload.entityStatus } : tl,
      )
    }
    case 'CLEAR-DATA':
      return []
    default: {
      return state
    }
  }
}

export const removeTodolistAC = (todolistId: string) => {
  return {
    type: 'REMOVE_TODOLIST',
    payload: {
      todolistId,
    },
  } as const
}

export const addTodolistAC = (todolist: Todolist) => {
  return {
    type: 'ADD_TODOLIST',
    payload: {
      todolist,
    },
  } as const
}

export const changeTodoListTitleAC = (payload: { todolistId: string; title: string }) => {
  return {
    type: 'CHANGE_TODOLIST_TITLE',
    payload,
  } as const
}

export const changeTodoListFilterAC = (payload: { todolistId: string; filter: FilterValues }) => {
  return {
    type: 'CHANGE_TODOLIST_FILTER',
    payload,
  } as const
}

export const changeTodolistEntityStatusAC = (payload: { id: string; entityStatus: RequestStatus }) => {
  return { type: 'CHANGE-TODOLIST-ENTITY-STATUS', payload } as const
}

export const setTodolistsAC = (todolists: Todolist[]) => {
  return { type: 'SET-TODOLISTS', todolists } as const
}

export const clearTodosDataAC = () => {
  return {
    type: 'CLEAR-DATA',
  } as const
}

export const fetchTodolistTC = (): AppThunk => (dispatch: AppDispatch) => {
  dispatch(setAppStatusAC('loading'))
  todolistsApi
    .getTodolists()
    .then((res) => {
      dispatch(setAppStatusAC('succeeded'))
      dispatch(setTodolistsAC(res.data))
      return res.data
    })
    .then((todos) => {
      todos.forEach((tl) => {
        dispatch(fetchTasksTC(tl.id))
      })
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
}

export const addTodolistTC =
  (title: string): AppThunk =>
  (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsApi
      .createTodolist(title)
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(setAppStatusAC('succeeded'))
          dispatch(addTodolistAC(res.data.data.item))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch)
      })
  }

export const removeTodolistTC =
  (id: string): AppThunk =>
  (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodolistEntityStatusAC({ id, entityStatus: 'loading' }))
    todolistsApi
      .removeTodolist(id)
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(setAppStatusAC('succeeded'))
          dispatch(removeTodolistAC(id))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch((error) => {
        dispatch(changeTodolistEntityStatusAC({ id, entityStatus: 'idle' }))
        handleServerNetworkError(error, dispatch)
      })
  }

export const updateTodolistTitleTC =
  (arg: { todolistId: string; title: string }): AppThunk =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(setAppStatusAC('loading'))
    const todolists = getState().todolists
    const { todolistId, title } = arg
    const todolist = todolists?.find((tl) => tl.id === todolistId)
    dispatch(changeTodolistEntityStatusAC({ id: todolistId, entityStatus: 'loading' }))
    if (todolist) {
      todolistsApi
        .updateTodolist({ id: todolistId, title })
        .then((res) => {
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setAppStatusAC('succeeded'))
            dispatch(changeTodolistEntityStatusAC({ id: todolistId, entityStatus: 'succeeded' }))
            dispatch(changeTodoListTitleAC(arg))
          } else {
            handleServerAppError(res.data, dispatch)
          }
        })
        .catch((error) => {
          dispatch(changeTodolistEntityStatusAC({ id: todolistId, entityStatus: 'idle' }))
          handleServerNetworkError(error, dispatch)
        })
    }
  }
