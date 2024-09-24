import {TasksStateType} from '../types/types';
import {v1} from 'uuid';
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from './tasks-reducer';
import {addTodolistAC, removeTodolistAC} from './todolists-reducer';


let startState: TasksStateType = {}
let todolistId1: string
let todolistId2: string

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

    startState = {
        [todolistId1]: [
            {id: '1', title: 'CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false},
            {id: '4', title: 'Redux', isDone: false},
            {id: '5', title: 'Typescript', isDone: false},
            {id: '6', title: 'RTK query', isDone: false}
        ],
        [todolistId2]: [
            {id: '1', title: 'Book', isDone: false},
            {id: '2', title: 'Milk', isDone: true},
        ]
    }
})

test('correct task should be removed from correct array', () => {
    const endState = tasksReducer(startState, removeTaskAC({taskId: '1', todolistId: todolistId1}))

    expect(endState[todolistId1].length).toBe(5)
    expect(endState[todolistId1][0].id).toBe('2')
    expect(endState).toEqual({
            [todolistId1]: [
                {id: '2', title: 'JS', isDone: true},
                {id: '3', title: 'React', isDone: false},
                {id: '4', title: 'Redux', isDone: false},
                {id: '5', title: 'Typescript', isDone: false},
                {id: '6', title: 'RTK query', isDone: false}
            ],
            [todolistId2]: [
                {id: '1', title: 'Book', isDone: false},
                {id: '2', title: 'Milk', isDone: true},
            ]
        }
    )
})

test('correct todolist of tasks should be removed', () => {
    const endState = tasksReducer(startState, removeTodolistAC(todolistId1))

    const keys = Object.keys(endState)
    expect(keys.length).toBe(1)
    expect(endState[todolistId1]).not.toBeDefined()
})

test('correct task should be added to correct array', () => {
    const newTaskTitle = 'New task'
    const endState = tasksReducer(startState, addTaskAC({
        title: newTaskTitle,
        todolistId: todolistId1
    }))

    expect(endState[todolistId1].length).toBe(7)
    expect(endState[todolistId1][6].title).toBe(newTaskTitle)

    expect(endState[todolistId2].length).toBe(2)
    expect(endState[todolistId1].length).toBe(7)
    expect(endState[todolistId1][6].id).toBeDefined()
    expect(endState[todolistId1][6].title).toBe('New task')
    expect(endState[todolistId1][6].isDone).toBeFalsy()
})

test('correct task should change its name', () => {
    const newTitle = 'New Title TodoList'

    const endState = tasksReducer(startState, changeTaskTitleAC({
        taskId: '1',
        todolistId: todolistId1,
        title: newTitle
    }))

    expect(endState[todolistId1].length).toBe(6)
    expect(endState[todolistId1][0].title).toBe(newTitle)
})

test('correct task should change its status', () => {
    const endState = tasksReducer(startState, changeTaskStatusAC({taskId: '1', todolistId: todolistId1, status: false}))

    expect(endState[todolistId1].length).toBe(6)
    expect(endState[todolistId1][0].isDone).toBeFalsy()
})

test('new array should be added when new todolist is added', () => {
    const newTodoListTitle = 'New TodoList'
    const endState = tasksReducer(startState, addTodolistAC(newTodoListTitle))

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== todolistId1 && k !== todolistId2)
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})