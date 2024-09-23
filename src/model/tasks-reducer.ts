import {v1} from 'uuid';
import {TasksStateType} from '../types/types';
import {AddTodolistActionType, RemoveTodolistActionType} from './todolists-reducer';

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

// export type RemoveTodoListOfTasksActionType = ReturnType<typeof removeTodolistOfTasksAC>
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
// export type CreateEmptyTodoListOfTasksActionType = ReturnType<typeof createEmptyTodoListOfTasksAC>

// export type RemoveTodoListOfTasks = {
//     type: 'REMOVE-TODOLIST-OF-TASKS',
//     payload: {
//         idTodoList: string
//     }
// }

// export type RemoveTaskActionType = {
//     type: 'REMOVE-TASK'
//     payload: {
//         idTask: string
//         idTodoList: string
//     }
// }

// export type AddTaskActionType = {
//     type: 'ADD-TASK'
//     payload: {
//         title: string,
//         idTodoList: string,
//         idTask: string
//     }
// }

// export type ChangeTaskTitleActionType = {
//     type: 'CHANGE-TASK-TITLE'
//     payload: {
//         idTask: string
//         idTodoList: string
//         title: string
//     }
// }

// export type ChangeTaskStatusActionType = {
//     type: 'CHANGE-TASK-STATUS'
//     payload: {
//         idTask: string
//         idTodoList: string
//         status: boolean
//     }
// }

// export type CreateEmptyTodoListOfTasksActionType = {
//     type: 'CREATE-EMPTY-TODOLIST-OF-TASKS'
//     payload: {
//         idTodoList: string
//     }
// }

type ActionsType =
    | RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskTitleActionType
    | ChangeTaskStatusActionType
    | RemoveTodolistActionType
    | AddTodolistActionType
    // | RemoveTodoListOfTasksActionType
    // | CreateEmptyTodoListOfTasksActionType

export const tasksReducer = (state = initialState, action: ActionsType) : TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {...state, [action.payload.todoListId]: state[action.payload.todoListId].filter(t =>
                    t.id !== action.payload.taskId)}
        }
        case 'ADD-TASK': {
            //const newId = v1() // вынести в payload (нарушает стуктуру чистой функции)
            let newTask = {id: action.payload.taskId, title: action.payload.title, isDone: false}

            return {...state, [action.payload.todoListId]: [...state[action.payload.todoListId], newTask]}
        }
        case 'CHANGE-TASK-TITLE': {
            return {...state, [action.payload.todoListId]: state[action.payload.todoListId].map(t => t.id === action.payload.taskId ? {...t, title: action.payload.title} : t)}
        }
        case 'CHANGE-TASK-STATUS': {
            return {...state, [action.payload.todoListId]: state[action.payload.todoListId].map(t => t.id === action.payload.taskId ? {...t, isDone: action.payload.status} : t)}
        }
        case 'REMOVE-TODOLIST': {
            const newState = {...state}
            delete newState[action.payload.todolistId]
           // const { [action.payload.idTodoList]: _, ...updatedState } = state;

            return newState;
        }
        // case 'CREATE-EMPTY-TODOLIST-OF-TASKS': {
        //     return {...state, [action.payload.idTodoList]: []};
        // }
        case 'ADD-TODOLIST': {
            return {...state, [action.payload.todolistId]: []};
        }
        default: {
            return state
        }
    }
}

// export const removeTodolistOfTasksAC = (payload: {todoListId: string}) => {
//     return  {
//         type: 'REMOVE-TODOLIST-OF-TASKS',
//         payload
//     } as const
// }

export const removeTaskAC = (payload: {taskId: string, todoListId: string}) => {
    return  {
        type: 'REMOVE-TASK',
        payload
    } as const
}

export const addTaskAC = (payload: {title: string, todoListId: string, taskId: string}) => {
    return {
        type: 'ADD-TASK',
        payload
    } as const
}

export const changeTaskTitleAC = (payload: {taskId: string, todoListId: string, title: string}) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload
    } as const
}

export const changeTaskStatusAC = (payload: {taskId: string, todoListId: string, status: boolean}) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload
    } as const
}

// export const createEmptyTodoListOfTasksAC = (payload: {idTodoList: string}) => {
//     return {
//         type: 'CREATE-EMPTY-TODOLIST-OF-TASKS',
//         payload
//     } as const
// }