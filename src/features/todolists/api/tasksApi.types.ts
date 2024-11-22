import { TaskPriority, TaskStatus } from '../lib/enums'
import { RequestStatus } from 'app/app-reducer'

export type BaseTask = {
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

export type DomainTask = BaseTask & {
  entityStatus: RequestStatus
}

export type Tasks = {
  [key: string]: Array<DomainTask>
}

export type GetTasksResponse = {
  items: Array<BaseTask>
  totalCount: number
  error: string | null
}

export type UpdateTaskModel = Omit<BaseTask, 'id' | 'todoListId' | 'order' | 'addedDate'>
