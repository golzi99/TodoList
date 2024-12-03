import { addTodolist, DomainTodolist, todolistsReducer } from '../todolistsSlice'
import { tasksReducer } from '../tasksSlice'
import { Tasks } from '../../api/tasksApi.types'
import { Todolist } from '../../api/todolistsApi.types'
import { v1 } from 'uuid'

test('ids should be equals', () => {
  const startTasksState: Tasks = {}
  const startTodolistsState: DomainTodolist[] = []

  const newTodoListTitle = 'New TodoList'
  const newTodoList: Todolist = {
    id: v1(),
    title: newTodoListTitle,
    addedDate: '',
    order: 1,
  }

  const action = addTodolist({ todolist: newTodoList })

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.payload.todolist.id)
  expect(idFromTodolists).toBe(action.payload.todolist.id)
})
