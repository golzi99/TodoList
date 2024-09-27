import {v1} from 'uuid';
import {FilterValuesType, TodoListType} from '../types/types';


const initialState: Array<TodoListType> = []

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodoListTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodoListFilterAC>


type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

export const todolistsReducer = (state: Array<TodoListType> = initialState, action: ActionsType) : Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.payload.todolistId)
        }
        case 'ADD-TODOLIST': {
            const newTodoList: TodoListType = {id: action.payload.todolistId, title: action.payload.title, filter: 'all'}

            return [...state, newTodoList]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(tl => tl.id === action.payload.todolistId ? {...tl, title: action.payload.title} : tl)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(tl => tl.id === action.payload.todolistId ? {...tl, filter: action.payload.filter} : tl)
        }
        default: {
            return state
        }
    }
}

export const removeTodolistAC = (todolistId: string) => {
    return  {
        type: 'REMOVE-TODOLIST',
        payload: {
            todolistId
        }
    } as const
}

export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title,
            todolistId: v1()
        }
    } as const
}
//важно ли, чтобы тут создавать id: v1() или можно вынести в самой функции в App?

export const changeTodoListTitleAC = (payload: {todolistId: string, title: string}) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload
    } as const
}

export const changeTodoListFilterAC = (payload: {todolistId: string, filter: FilterValuesType}) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload
    } as const
}