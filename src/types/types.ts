export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskPropsType = {
    id: string,
    title: string,
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TasksStateType = {
    [key: string]: TaskPropsType[]
}

export type ThemeMode = 'light' | 'dark'