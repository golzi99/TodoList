import { Todolist } from '../api/todolistsApi.types'
import { AppDispatch, RootState } from 'app/store'
import { _todolistsApi } from '../api/_todolistsApi'
import { RequestStatus, setAppStatus } from 'app/appSlice'
import { ResultCode } from '../lib/enums'
import { handleServerAppError, handleServerNetworkError } from 'common/utils'
import { fetchTasksTC } from './tasksSlice'
import { createSlice } from '@reduxjs/toolkit'

export type DomainTodolist = Todolist & {
  filter: FilterValues
  entityStatus: RequestStatus
}

export type FilterValues = 'all' | 'active' | 'completed'

export const todolistsSlice = createSlice({
  name: 'todolists',
  initialState: [] as Array<DomainTodolist>,
  selectors: {
    selectTodoLists: (state) => state,
  },
  reducers: (create) => ({
    removeTodolist: create.reducer<{ id: string }>((state, action) => {
      const index = state.findIndex((tl) => tl.id === action.payload.id)
      if (index !== -1) {
        state.splice(index, 1)
      }
    }),
    addTodolist: create.reducer<{ todolist: Todolist }>((state, action) => {
      const newTodolist: DomainTodolist = { ...action.payload.todolist, filter: 'all', entityStatus: 'idle' }
      state.unshift(newTodolist)
    }),
    changeTodolistTitle: create.reducer<{ id: string; title: string }>((state, action) => {
      const todolist = state.find((tl) => tl.id === action.payload.id)
      if (todolist) todolist.title = action.payload.title
    }),
    changeTodolistEntityStatus: create.reducer<{ id: string; entityStatus: RequestStatus }>((state, action) => {
      const todolist = state.find((tl) => tl.id === action.payload.id)
      if (todolist) todolist.entityStatus = action.payload.entityStatus
    }),
    changeTodoListFilter: create.reducer<{ id: string; filter: FilterValues }>((state, action) => {
      const todolist = state.find((tl) => tl.id === action.payload.id)
      if (todolist) todolist.filter = action.payload.filter
    }),
    setTodolists: create.reducer<{ todolists: Array<Todolist> }>((state, action) => {
      action.payload.todolists.forEach((tl) => {
        state.push({ ...tl, filter: 'all', entityStatus: 'idle' })
      })
    }),
    clearTodolists: create.reducer(() => {
      return []
    }),
  }),
})

export const {
  addTodolist,
  setTodolists,
  clearTodolists,
  changeTodolistEntityStatus,
  changeTodolistTitle,
  changeTodoListFilter,
  removeTodolist,
} = todolistsSlice.actions
export const { selectTodoLists } = todolistsSlice.selectors
export const todolistsReducer = todolistsSlice.reducer

export const fetchTodolistTC = () => (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: 'loading' }))
  _todolistsApi
    .getTodolists()
    .then((res) => {
      dispatch(setAppStatus({ status: 'succeeded' }))
      dispatch(setTodolists({ todolists: res.data }))
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

export const addTodolistTC = (title: string) => (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: 'loading' }))
  _todolistsApi
    .createTodolist(title)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatus({ status: 'succeeded' }))
        dispatch(addTodolist({ todolist: res.data.data.item }))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
}

export const removeTodolistTC = (id: string) => (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: 'loading' }))
  dispatch(changeTodolistEntityStatus({ id, entityStatus: 'loading' }))
  _todolistsApi
    .removeTodolist(id)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatus({ status: 'succeeded' }))
        dispatch(removeTodolist({ id }))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((error) => {
      dispatch(changeTodolistEntityStatus({ id, entityStatus: 'idle' }))
      handleServerNetworkError(error, dispatch)
    })
}

export const updateTodolistTitleTC =
  (arg: { todolistId: string; title: string }) => (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(setAppStatus({ status: 'loading' }))
    const todolists = getState().todolists
    const { todolistId, title } = arg
    const todolist = todolists?.find((tl) => tl.id === todolistId)
    dispatch(changeTodolistEntityStatus({ id: todolistId, entityStatus: 'loading' }))
    if (todolist) {
      _todolistsApi
        .updateTodolist({ id: todolistId, title })
        .then((res) => {
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setAppStatus({ status: 'succeeded' }))
            dispatch(changeTodolistEntityStatus({ id: todolistId, entityStatus: 'succeeded' }))
            dispatch(changeTodolistTitle({ id: todolistId, title: title }))
          } else {
            handleServerAppError(res.data, dispatch)
          }
        })
        .catch((error) => {
          dispatch(changeTodolistEntityStatus({ id: todolistId, entityStatus: 'idle' }))
          handleServerNetworkError(error, dispatch)
        })
    }
  }
