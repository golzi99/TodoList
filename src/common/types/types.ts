export type TodolistProps = {
  id: string
  title: string
  filter: FilterValues
}

export type TaskProps = {
  id: string
  title: string
  isDone: boolean
}

export type FilterValues = "all" | "active" | "completed"

export type TasksState = {
  [key: string]: TaskProps[]
}

export type ThemeMode = "light" | "dark"

export type BaseResponse<T = {}> = {
  resultCode: number
  messages: Array<string>
  fieldsErrors: Array<FieldError>
  data: T
}

export type FieldError = {
  error: string
  field: string
}
