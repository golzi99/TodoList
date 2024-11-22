import { AddTodolistActionType, ClearTodosDataActionType, RemoveTodolistActionType } from './todolists-reducer'
import { BaseTask, DomainTask, Tasks, UpdateTaskModel } from '../api/tasksApi.types'
import { AppDispatch, AppThunk } from 'app/store'
import { tasksApi } from '../api/tasksApi'
import { RequestStatus, setAppStatusAC } from 'app/app-reducer'
import { ResultCode } from '../lib/enums'
import { handleServerNetworkError } from 'common/utils/handleServerNetworkError'
import { handleServerAppError } from 'common/utils/handleServerAppError'

const initialState: Tasks = {}

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type SetTasksActionType = ReturnType<typeof setTasksAC>
export type UpdateTaskActionType = ReturnType<typeof updateTaskAC>
export type ChangeTaskEntityStatusActionType = ReturnType<typeof changeTaskEntityStatusAC>

export type TaskActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | RemoveTodolistActionType
  | AddTodolistActionType
  | SetTasksActionType
  | UpdateTaskActionType
  | ClearTodosDataActionType
  | ChangeTaskEntityStatusActionType

export const tasksReducer = (state: Tasks = initialState, action: TaskActionsType): Tasks => {
  switch (action.type) {
    case 'SET-TASKS': {
      const stateCopy = { ...state }
      stateCopy[action.payload.todolistId] = action.payload.tasks.map((task) => {
        return { ...task, entityStatus: 'idle' }
      })
      return stateCopy
    }
    case 'REMOVE_TASK': {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].filter((t) => t.id !== action.payload.taskId),
      }
    }
    case 'ADD_TASK': {
      const newTask: DomainTask = { ...action.payload.task, entityStatus: 'idle' }
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
                entityStatus: 'succeeded',
              }
            : t,
        ),
      }
    }
    case 'CHANGE-TASK-ENTITY-STATUS': {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map((t) =>
          t.id === action.payload.taskId ? { ...t, entityStatus: action.payload.entityStatus } : t,
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

export const setTasksAC = (payload: { todolistId: string; tasks: BaseTask[] }) => {
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

export const addTaskAC = (payload: { task: BaseTask }) => {
  return {
    type: 'ADD_TASK',
    payload,
    // payload: {
    //   task: { ...payload.task, entityStatus: 'idle' },
    // },
  } as const
}

export const updateTaskAC = (payload: { task: BaseTask }) => {
  return {
    type: 'UPDATE_TASK',
    payload,
  } as const
}

export const changeTaskEntityStatusAC = (payload: {
  taskId: string
  todolistId: string
  entityStatus: RequestStatus
}) => {
  return {
    type: 'CHANGE-TASK-ENTITY-STATUS',
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
    dispatch(changeTaskEntityStatusAC({ taskId: arg.taskId, todolistId: arg.todolistId, entityStatus: 'loading' }))
    tasksApi
      .removeTask(arg)
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(setAppStatusAC('succeeded'))
          dispatch(
            changeTaskEntityStatusAC({ taskId: arg.taskId, todolistId: arg.todolistId, entityStatus: 'succeeded' }),
          )
          dispatch(removeTaskAC(arg))
        } else {
          dispatch(changeTaskEntityStatusAC({ taskId: arg.taskId, todolistId: arg.todolistId, entityStatus: 'failed' }))
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch((error) => {
        dispatch(changeTaskEntityStatusAC({ taskId: arg.taskId, todolistId: arg.todolistId, entityStatus: 'failed' }))
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
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch)
      })
  }

export const updateTaskTC =
  (arg: { task: BaseTask }): AppThunk =>
  (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC('loading'))
    const { task } = arg
    dispatch(changeTaskEntityStatusAC({ taskId: task.id, todolistId: task.todoListId, entityStatus: 'loading' }))

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
          dispatch(
            changeTaskEntityStatusAC({ taskId: task.id, todolistId: task.todoListId, entityStatus: 'succeeded' }),
          )
          dispatch(setAppStatusAC('succeeded'))
          dispatch(updateTaskAC({ task: res.data.data.item }))
        } else {
          dispatch(changeTaskEntityStatusAC({ taskId: task.id, todolistId: task.todoListId, entityStatus: 'failed' }))
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch((error) => {
        dispatch(changeTaskEntityStatusAC({ taskId: task.id, todolistId: task.todoListId, entityStatus: 'failed' }))
        handleServerNetworkError(error, dispatch)
      })
  }
