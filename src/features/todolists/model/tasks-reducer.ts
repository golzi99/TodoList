import { AddTodolistActionType, RemoveTodolistActionType } from "./todolists-reducer"
import { DomainTask, Tasks, UpdateTaskDomainModel, UpdateTaskModel } from "../api/tasksApi.types"
import { AppDispatch, AppThunk, RootState } from "app/store"
import { tasksApi } from "../api/tasksApi"
import { setAppStatusAC } from "app/app-reducer"
import { ResultCode } from "../lib/enums"
import { handleServerNetworkError } from "common/utils/handleServerNetworkError"
import { handleServerAppError } from "common/utils/handleServerAppError"

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

export const tasksReducer = (state: Tasks = initialState, action: TaskActionsType): Tasks => {
  switch (action.type) {
    case "SET-TASKS": {
      const stateCopy = { ...state }
      stateCopy[action.payload.todolistId] = action.payload.tasks
      return stateCopy
    }
    case "REMOVE_TASK": {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].filter((t) => t.id !== action.payload.taskId),
      }
    }
    case "ADD_TASK": {
      const newTask = action.payload.task
      return {
        ...state,
        [newTask.todoListId]: [newTask, ...state[newTask.todoListId]],
      }
    }
    case "REMOVE_TODOLIST": {
      const newState = { ...state }
      delete newState[action.payload.todolistId]
      return newState
    }
    case "ADD_TODOLIST": {
      return { ...state, [action.payload.todolist.id]: [] }
    }
    case "UPDATE_TASK": {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map((t) =>
          t.id === action.payload.taskId
            ? {
                ...t,
                ...action.payload.domainModel,
              }
            : t,
        ),
      }
    }
    default: {
      return state
    }
  }
}

export const setTasksAC = (payload: { todolistId: string; tasks: DomainTask[] }) => {
  return {
    type: "SET-TASKS",
    payload,
  } as const
}

export const removeTaskAC = (payload: { taskId: string; todolistId: string }) => {
  return {
    type: "REMOVE_TASK",
    payload,
  } as const
}

export const addTaskAC = (payload: { task: DomainTask }) => {
  return {
    type: "ADD_TASK",
    payload,
  } as const
}

export const updateTaskAC = (payload: { taskId: string; todolistId: string; domainModel: DomainTask }) => {
  return {
    type: "UPDATE_TASK",
    payload,
  } as const
}

export const fetchTasksTC =
  (todolistId: string): AppThunk =>
  (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC("loading"))
    tasksApi
      .getTasks(todolistId)
      .then((res) => {
        dispatch(setAppStatusAC("succeeded"))
        const tasks = res.data.items
        dispatch(setTasksAC({ todolistId, tasks }))
      })
      .catch((error) => {
        handleServerNetworkError(error.message, dispatch)
      })
  }

export const removeTaskTC =
  (arg: { taskId: string; todolistId: string }): AppThunk =>
  (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC("loading"))
    tasksApi
      .removeTask(arg)
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(setAppStatusAC("succeeded"))
          dispatch(removeTaskAC(arg))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch((error) => {
        handleServerNetworkError(error.message, dispatch)
      })
  }

export const addTaskTC =
  (arg: { title: string; todolistId: string }): AppThunk =>
  (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC("loading"))
    tasksApi
      .createTask(arg)
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(setAppStatusAC("succeeded"))
          dispatch(addTaskAC({ task: res.data.data.item }))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch((error) => {
        handleServerNetworkError(error.message, dispatch)
      })
  }

export const updateTaskTC =
  (arg: { taskId: string; todolistId: string; domainModel: UpdateTaskDomainModel }): AppThunk =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(setAppStatusAC("loading"))
    const { taskId, todolistId, domainModel } = arg

    const allTasksFromState = getState().tasks
    const tasksForCurrentTodolist = allTasksFromState[todolistId]
    const task = tasksForCurrentTodolist.find((t) => t.id === taskId)

    if (task) {
      const model: UpdateTaskModel = {
        status: domainModel.status ?? task.status,
        title: domainModel.title ?? task.title,
        deadline: domainModel.deadline ?? task.deadline,
        description: domainModel.description ?? task.description,
        priority: domainModel.priority ?? task.priority,
        startDate: domainModel.startDate ?? task.startDate,
      }

      tasksApi
        .updateTask({ taskId, todolistId, model })
        .then((res) => {
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setAppStatusAC("succeeded"))
            dispatch(updateTaskAC({ taskId, todolistId, domainModel: res.data.data.item }))
          } else {
            handleServerAppError(res.data, dispatch)
          }
        })
        .catch((error) => {
          handleServerNetworkError(error.message, dispatch)
        })
    }
  }
