import {TasksStateType, TodoListType} from '../types/types';
import {v1} from 'uuid';
import {
    addTodolistAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodolistAC,
    todolistsReducer
} from './todolists-reducer';
import {tasksReducer} from './tasks-reducer';

const todoListId1 = v1()
const todoListId2 = v1()

let startState: Array<TodoListType> = []

beforeEach(() => {
    startState = [
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'}
    ]
})

test('correct todolist should be removed', () => {
    const endState = todolistsReducer(startState, removeTodolistAC({todolistId: todoListId1}))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListId2)
})

test('correct todolist should be added', () => {
    const newTodoListTitle = 'New TodoList'
    const endState = todolistsReducer(startState, addTodolistAC({title: newTodoListTitle}))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodoListTitle)
})

test('correct todolist should change its name', () => {
    const newTitle = 'New Title TodoList'

    const endState = todolistsReducer(startState, changeTodoListTitleAC({todolistId: todoListId2, title: newTitle}))

    expect(endState.length).toBe(2)
    expect(endState[1].title).toBe(newTitle)
    expect(endState[1].id).toBe(todoListId2)
})

test('correct todolist should change its filter', () => {
    const newFilter1 = 'active'
    const newFilter2 = 'completed'

    const endState1 = todolistsReducer(startState, changeTodoListFilterAC({todolistId: todoListId2, filter: newFilter1}))
    const endState2 = todolistsReducer(startState, changeTodoListFilterAC({todolistId: todoListId2, filter: newFilter2}))

    expect(endState1.length).toBe(2)
    expect(endState1[1].filter).toBe(newFilter1)
    expect(endState1[1].id).toBe(todoListId2)

    expect(endState2.length).toBe(2)
    expect(endState2[1].filter).toBe(newFilter2)
    expect(endState2[1].id).toBe(todoListId2)
})


test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: TodoListType[] = []

    const action = addTodolistAC({title: 'new todolist'})

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.payload.todolistId)
    expect(idFromTodolists).toBe(action.payload.todolistId)
})