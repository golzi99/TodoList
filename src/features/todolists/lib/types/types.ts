import { Todolist } from '../../api/todolistsApi.types'
import { RequestStatus } from 'app/appSlice'

export type DomainTodolist = Todolist & {
  filter: FilterValues
  entityStatus: RequestStatus
}

export type FilterValues = 'all' | 'active' | 'completed'
