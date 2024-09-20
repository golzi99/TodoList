import {TasksStateType} from '../types/types';
import {v1} from 'uuid';
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC, createEmptyTodoListOfTasksAC,
    removeTaskAC,
    removeTodolistOfTasksAC,
    tasksReducer
} from './tasks-reducer';

const todoListId1 = v1()
const todoListId2 = v1()

const todoList1IDs = [
    v1(), v1(), v1(), v1(), v1(), v1()
]

let startState: TasksStateType = {}

beforeEach(() => {
    startState = {
        [todoListId1]: [
            {id: todoList1IDs[0], title: 'CSS', isDone: true},
            {id: todoList1IDs[1], title: 'JS', isDone: true},
            {id: todoList1IDs[2], title: 'React', isDone: false},
            {id: todoList1IDs[3], title: 'Redux', isDone: false},
            {id: todoList1IDs[4], title: 'Typescript', isDone: false},
            {id: todoList1IDs[5], title: 'RTK query', isDone: false}
        ],
        [todoListId2]: [
            {id: v1(), title: 'Book', isDone: false},
            {id: v1(), title: 'Milk', isDone: true},
        ]
    }
})

test('correct task should be removed', () => {
    const endState = tasksReducer(startState, removeTaskAC(todoList1IDs[0], todoListId1))

    expect(endState[todoListId1].length).toBe(5)
    expect(endState[todoListId1][0].id).toBe(todoList1IDs[1])
})

test('correct todolist of tasks should be removed', () => {
    const endState = tasksReducer(startState, removeTodolistOfTasksAC(todoListId1))

    expect(endState[todoListId1]).not.toBeDefined()
})

test('correct task should be added', () => {
    const newTaskTitle = 'New task'
    const endState = tasksReducer(startState, addTaskAC(newTaskTitle, todoListId1))

    expect(endState[todoListId1].length).toBe(7)
    expect(endState[todoListId1][6].title).toBe(newTaskTitle)
})

test('correct task should change its name', () => {
    const newTitle = 'New Title TodoList'

    const endState = tasksReducer(startState, changeTaskTitleAC(todoList1IDs[0], todoListId1, newTitle))

    expect(endState[todoListId1].length).toBe(6)
    expect(endState[todoListId1][0].title).toBe(newTitle)
})

test('correct task should change its status', () => {
    const endState = tasksReducer(startState, changeTaskStatusAC(todoList1IDs[0], todoListId1, false))

    expect(endState[todoListId1].length).toBe(6)
    expect(endState[todoListId1][0].isDone).toBe(false)
})

test('correct empty todolist of tasks should be created', () => {
    const newId = v1()
    const endState = tasksReducer(startState, createEmptyTodoListOfTasksAC(newId))

    expect(endState[newId].length).toBe(0)
    expect(endState[newId]).toBeDefined()
})
