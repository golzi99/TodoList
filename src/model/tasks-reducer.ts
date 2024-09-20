import {v1} from 'uuid';
import {TasksStateType} from '../types/types';

const todoListId1 = v1()
const todoListId2 = v1()

const initialState: TasksStateType = {
    [todoListId1]: [
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
        {id: v1(), title: 'Typescript', isDone: false},
        {id: v1(), title: 'RTK query', isDone: false}
    ],
    [todoListId2]: [
        {id: v1(), title: 'Book', isDone: false},
        {id: v1(), title: 'Milk', isDone: true},
    ]
}

export type RemoveTodoListOfTasks = {
    type: 'REMOVE-TODOLIST-OF-TASKS',
    payload: {
        idTodoList: string
    }
}

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    payload: {
        idTask: string
        idTodoList: string
    }
}

export type AddTaskActionType = {
    type: 'ADD-TASK'
    payload: {
        title: string,
        idTodoList: string
    }
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    payload: {
        idTask: string
        idTodoList: string
        title: string
    }
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    payload: {
        idTask: string
        idTodoList: string
        status: boolean
    }
}

export type CreateEmptyTodoListOfTasksActionType = {
    type: 'CREATE-EMPTY-TODOLIST-OF-TASKS'
    payload: {
        idTodoList: string
    }
}

type ActionsType =
    | RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskTitleActionType
    | ChangeTaskStatusActionType
    | RemoveTodoListOfTasks
    |CreateEmptyTodoListOfTasksActionType

export const tasksReducer = (state = initialState, action: ActionsType) : TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {...state, [action.payload.idTodoList]: state[action.payload.idTodoList].filter(t =>
                    t.id !== action.payload.idTask)}
        }
        case 'ADD-TASK': {
            const newId = v1()
            let newTask = {id: newId, title: action.payload.title, isDone: false}

            return {...state, [action.payload.idTodoList]: [...state[action.payload.idTodoList], newTask]}
        }
        case 'CHANGE-TASK-TITLE': {
            return {...state, [action.payload.idTodoList]: state[action.payload.idTodoList].map(t => t.id === action.payload.idTask ? {...t, title: action.payload.title} : t)}
        }
        case 'CHANGE-TASK-STATUS': {
            return {...state, [action.payload.idTodoList]: state[action.payload.idTodoList].map(t => t.id === action.payload.idTask ? {...t, isDone: action.payload.status} : t)}
        }
        case 'REMOVE-TODOLIST-OF-TASKS': {
            const { [action.payload.idTodoList]: _, ...updatedState } = state;
            return updatedState;
        }
        case 'CREATE-EMPTY-TODOLIST-OF-TASKS': {
            return {...state, [action.payload.idTodoList]: []};
        }
        default: {
            return state
        }
    }
}

export const removeTodolistOfTasksAC = (idTodoList: string) => {
    return  {
        type: 'REMOVE-TODOLIST-OF-TASKS',
        payload: {
            idTodoList
        }
    } as const
}

export const removeTaskAC = (idTask: string, idTodoList: string) => {
    return  {
        type: 'REMOVE-TASK',
        payload: {
            idTask,
            idTodoList
        }
    } as const
}

export const addTaskAC = (title: string, idTodoList: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            title,
            idTodoList
        }
    } as const
}

export const changeTaskTitleAC = (idTask: string, idTodoList: string, title: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            idTask,
            idTodoList,
            title
        }
    } as const
}

export const changeTaskStatusAC = (idTask: string, idTodoList: string, status: boolean) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            idTask,
            idTodoList,
            status
        }
    } as const
}

export const createEmptyTodoListOfTasks = (idTodoList: string) => {
    return {
        type: 'CREATE-EMPTY-TODOLIST-OF-TASKS',
        payload: {
            idTodoList,
        }
    } as const
}