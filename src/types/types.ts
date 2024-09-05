export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskPropsType = {
    id: string,
    title: string,
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"