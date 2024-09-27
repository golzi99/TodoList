import {v1} from 'uuid';
import {TasksStateType} from '../types/types';
import {AddTodolistActionType, RemoveTodolistActionType} from './todolists-reducer';

const initialState: TasksStateType = {}

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>

type ActionsType =
    | RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskTitleActionType
    | ChangeTaskStatusActionType
    | RemoveTodolistActionType
    | AddTodolistActionType

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state, [action.payload.todolistId]: state[action.payload.todolistId].filter(t =>
                    t.id !== action.payload.taskId)
            }
        }
        case 'ADD-TASK': {
            let newTask = {id: action.payload.taskId, title: action.payload.title, isDone: false}

            return {...state, [action.payload.todolistId]: [...state[action.payload.todolistId], newTask]}
        }
        case 'CHANGE-TASK-TITLE': {
            return {...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {
                    ...t,
                    title: action.payload.title
                } : t)
            }
        }
        case 'CHANGE-TASK-STATUS': {
            return {...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {
                    ...t,
                    isDone: action.payload.status
                } : t)
            }
        }
        case 'REMOVE-TODOLIST': {
            const newState = {...state}
            delete newState[action.payload.todolistId]
            // const { [action.payload.idTodoList]: _, ...updatedState } = state;

            return newState;
        }
        case 'ADD-TODOLIST': {
            return {...state, [action.payload.todolistId]: []};
        }
        default: {
            return state
        }
    }
}

export const removeTaskAC = (payload: { taskId: string, todolistId: string }) => {
    return {
        type: 'REMOVE-TASK',
        payload
    } as const
}

export const addTaskAC = (payload: { title: string, todolistId: string }) => {
    return {
        type: 'ADD-TASK',
        payload: {
            title: payload.title,
            todolistId: payload.todolistId,
            taskId: v1()
        }
    } as const
}

export const changeTaskTitleAC = (payload: { taskId: string, todolistId: string, title: string }) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload
    } as const
}

export const changeTaskStatusAC = (payload: { taskId: string, todolistId: string, status: boolean }) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload
    } as const
}
