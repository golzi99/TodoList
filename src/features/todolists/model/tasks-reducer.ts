import { AddTodolistActionType, ClearTodosDataActionType, RemoveTodolistActionType } from './todolists-reducer'
import { DomainTask, Tasks, UpdateTaskModel } from '../api/tasksApi.types'
import { AppDispatch, AppThunk } from 'app/store'
import { tasksApi } from '../api/tasksApi'
import { setAppStatusAC } from 'app/app-reducer'
import { ResultCode } from '../lib/enums'
import { handleServerNetworkError } from 'common/utils/handleServerNetworkError'
import { handleServerAppError } from 'common/utils/handleServerAppError'

const initialState: Tasks = {}

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type SetTasksActionType = ReturnType<typeof setTasksAC>
export type UpdateTaskACActionType = ReturnType<typeof updateTaskAC>

export type TaskActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | RemoveTodolistActionType
  | AddTodolistActionType
  | SetTasksActionType
  | UpdateTaskACActionType
  | ClearTodosDataActionType

export const tasksReducer = (state: Tasks = initialState, action: TaskActionsType): Tasks => {
  switch (action.type) {
    case 'SET-TASKS': {
      const stateCopy = { ...state }
      stateCopy[action.payload.todolistId] = action.payload.tasks
      return stateCopy
    }
    case 'REMOVE_TASK': {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].filter((t) => t.id !== action.payload.taskId),
      }
    }
    case 'ADD_TASK': {
      const newTask = action.payload.task
      return {
        ...state,
        [newTask.todoListId]: [newTask, ...state[newTask.todoListId]],
      }
    }
    case 'REMOVE_TODOLIST': {
      const newState = { ...state }
      delete newState[action.payload.todolistId]
      return newState
    }
    case 'ADD_TODOLIST': {
      return { ...state, [action.payload.todolist.id]: [] }
    }
    case 'UPDATE_TASK': {
      return {
        ...state,
        [action.payload.task.todoListId]: state[action.payload.task.todoListId].map((t) =>
          t.id === action.payload.task.id
            ? {
                ...action.payload.task,
              }
            : t,
        ),
      }
    }
    case 'CLEAR-DATA':
      return {}
    default: {
      return state
    }
  }
}

export const setTasksAC = (payload: { todolistId: string; tasks: DomainTask[] }) => {
  return {
    type: 'SET-TASKS',
    payload,
  } as const
}

export const removeTaskAC = (payload: { taskId: string; todolistId: string }) => {
  return {
    type: 'REMOVE_TASK',
    payload,
  } as const
}

export const addTaskAC = (payload: { task: DomainTask }) => {
  return {
    type: 'ADD_TASK',
    payload,
  } as const
}

export const updateTaskAC = (payload: { task: DomainTask }) => {
  return {
    type: 'UPDATE_TASK',
    payload,
  } as const
}

export const fetchTasksTC =
  (todolistId: string): AppThunk =>
  (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC('loading'))
    tasksApi
      .getTasks(todolistId)
      .then((res) => {
        dispatch(setAppStatusAC('succeeded'))
        const tasks = res.data.items
        dispatch(setTasksAC({ todolistId, tasks }))
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch)
      })
  }

export const removeTaskTC =
  (arg: { taskId: string; todolistId: string }): AppThunk =>
  (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC('loading'))
    tasksApi
      .removeTask(arg)
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(setAppStatusAC('succeeded'))
          dispatch(removeTaskAC(arg))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch)
      })
  }

export const addTaskTC =
  (arg: { title: string; todolistId: string }): AppThunk =>
  (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC('loading'))
    tasksApi
      .createTask(arg)
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(setAppStatusAC('succeeded'))
          dispatch(addTaskAC({ task: res.data.data.item }))
        } else {
          handleServerAppError<{ item: DomainTask }>(res.data, dispatch)
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch)
      })
  }

export const updateTaskTC =
  (arg: { task: DomainTask }): AppThunk =>
  (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC('loading'))
    const { task } = arg

    const model: UpdateTaskModel = {
      status: task.status,
      title: task.title,
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
    }

    tasksApi
      .updateTask({ taskId: task.id, todolistId: task.todoListId, model })
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(setAppStatusAC('succeeded'))
          dispatch(updateTaskAC({ task: res.data.data.item }))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch)
      })
  }
