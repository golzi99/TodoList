import {v1} from 'uuid';
import {TasksStateType} from '../types/types';
import {AddTodolistActionType, RemoveTodolistActionType} from './todolists-reducer';

// const todoListId1 = v1()
// const todoListId2 = v1()

const initialState: TasksStateType = {
    // [todoListId1]: [
    //     {id: v1(), title: 'CSS', isDone: true},
    //     {id: v1(), title: 'JS', isDone: true},
    //     {id: v1(), title: 'React', isDone: false},
    //     {id: v1(), title: 'Redux', isDone: false},
    //     {id: v1(), title: 'Typescript', isDone: false},
    //     {id: v1(), title: 'RTK query', isDone: false}
    // ],
    // [todoListId2]: [
    //     {id: v1(), title: 'Book', isDone: false},
    //     {id: v1(), title: 'Milk', isDone: true},
    // ]
}

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
            //const newId = v1() // вынести в payload (нарушает стуктуру чистой функции)
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
