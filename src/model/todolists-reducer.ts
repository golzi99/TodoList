import {v1} from 'uuid';
import {FilterValuesType, TodolistType} from '../types/types';


const initialState: Array<TodolistType> = []

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodoListTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodoListFilterAC>


type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

export const todolistsReducer = (state: Array<TodolistType> = initialState, action: ActionsType) : Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE_TODOLIST': {
            return state.filter(tl => tl.id !== action.payload.todolistId)
        }
        case 'ADD_TODOLIST': {
            const newTodoList: TodolistType = {id: action.payload.todolistId, title: action.payload.title, filter: 'all'}

            return [...state, newTodoList]
        }
        case 'CHANGE_TODOLIST_TITLE': {
            return state.map(tl => tl.id === action.payload.todolistId ? {...tl, title: action.payload.title} : tl)
        }
        case 'CHANGE_TODOLIST_FILTER': {
            return state.map(tl => tl.id === action.payload.todolistId ? {...tl, filter: action.payload.filter} : tl)
        }
        default: {
            return state
        }
    }
}

export const removeTodolistAC = (todolistId: string) => {
    return  {
        type: 'REMOVE_TODOLIST',
        payload: {
            todolistId
        }
    } as const
}

export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD_TODOLIST',
        payload: {
            title,
            todolistId: v1()
        }
    } as const
}
//важно ли, чтобы тут создавать id: v1() или можно вынести в самой функции в App?

export const changeTodoListTitleAC = (payload: {todolistId: string, title: string}) => {
    return {
        type: 'CHANGE_TODOLIST_TITLE',
        payload
    } as const
}

export const changeTodoListFilterAC = (payload: {todolistId: string, filter: FilterValuesType}) => {
    return {
        type: 'CHANGE_TODOLIST_FILTER',
        payload
    } as const
}