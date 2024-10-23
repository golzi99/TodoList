import { TaskPriority, TaskStatus } from "../lib/enums"

export type DomainTask = {
  description: string
  title: string
  status: TaskStatus
  priority: TaskPriority
  startDate: string
  deadline: string
  id: string
  todoListId: string
  order: number
  addedDate: string
}

export type Tasks = {
  [key: string]: Array<DomainTask>
}

export type GetTasksResponse = {
  items: Array<DomainTask>
  totalCount: number
  error: string | null
}

export type UpdateTaskModel = Partial<Omit<DomainTask, "id" | "todoListId" | "order" | "addedDate">>
