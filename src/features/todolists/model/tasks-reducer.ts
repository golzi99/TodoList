import { AddTodolistActionType, RemoveTodolistActionType } from "./todolists-reducer"
import { DomainTask, Tasks, UpdateTaskDomainModel, UpdateTaskModel } from "../api/tasksApi.types"
import { AppDispatch, RootState } from "app/store"
import { tasksApi } from "../api/tasksApi"

const initialState: Tasks = {}

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type SetTasksActionType = ReturnType<typeof setTasksAC>
export type UpdateTaskACActionType = ReturnType<typeof updateTaskAC>

type ActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | RemoveTodolistActionType
  | AddTodolistActionType
  | SetTasksActionType
  | UpdateTaskACActionType

export const tasksReducer = (state: Tasks = initialState, action: ActionsType): Tasks => {
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

export const updateTaskAC = (payload: { taskId: string; todolistId: string; domainModel: UpdateTaskDomainModel }) => {
  return {
    type: "UPDATE_TASK",
    payload,
  } as const
}

export const fetchTasksTC = (todolistId: string) => (dispatch: AppDispatch) => {
  tasksApi.getTasks(todolistId).then((res) => {
    const tasks = res.data.items
    dispatch(setTasksAC({ todolistId, tasks }))
  })
}

export const removeTaskTC = (arg: { taskId: string; todolistId: string }) => (dispatch: AppDispatch) => {
  tasksApi.removeTask(arg).then((res) => {
    dispatch(removeTaskAC(arg))
  })
}

export const addTaskTC = (arg: { title: string; todolistId: string }) => (dispatch: AppDispatch) => {
  tasksApi.createTask(arg).then((res) => {
    dispatch(addTaskAC({ task: res.data.data.item }))
  })
}

export const updateTaskTC =
  (arg: { taskId: string; todolistId: string; domainModel: UpdateTaskDomainModel }) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
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

      tasksApi.updateTask({ taskId, todolistId, model }).then((res) => {
        dispatch(updateTaskAC(arg))
      })
    }
  }
