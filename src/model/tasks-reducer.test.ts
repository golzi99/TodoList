import {TasksStateType} from '../types/types';
import {v1} from 'uuid';
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    removeTodolistOfTasksAC,
    tasksReducer
} from './tasks-reducer';
import {addTodolistAC} from './todolists-reducer';

const todoListId1 = v1()
const todoListId2 = v1()

const todoList1IDs = [
    v1(), v1(), v1(), v1(), v1(), v1()
]

const todoList2IDs = [
    v1(), v1()
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
            {id: todoList2IDs[0], title: 'Book', isDone: false},
            {id: todoList2IDs[1], title: 'Milk', isDone: true},
        ]
    }
})

test('correct task should be removed from correct array', () => {
    const endState = tasksReducer(startState, removeTaskAC({taskId: todoList1IDs[0], todoListId: todoListId1}))

    expect(endState[todoListId1].length).toBe(5)
    expect(endState[todoListId1][0].id).toBe(todoList1IDs[1])
    expect(endState).toEqual({
            [todoListId1]: [
                {id: todoList1IDs[1], title: 'JS', isDone: true},
                {id: todoList1IDs[2], title: 'React', isDone: false},
                {id: todoList1IDs[3], title: 'Redux', isDone: false},
                {id: todoList1IDs[4], title: 'Typescript', isDone: false},
                {id: todoList1IDs[5], title: 'RTK query', isDone: false}
            ],
            [todoListId2]: [
                {id: todoList2IDs[0], title: 'Book', isDone: false},
                {id: todoList2IDs[1], title: 'Milk', isDone: true},
            ]
        }
    )
})

test('correct todolist of tasks should be removed', () => {
    const endState = tasksReducer(startState, removeTodolistOfTasksAC({todoListId: todoListId1}))

    expect(endState[todoListId1]).not.toBeDefined()
})

test('correct task should be added to correct array', () => {
    const newTaskTitle = 'New task'
    const newTaskId = v1()
    const endState = tasksReducer(startState, addTaskAC({
        title: newTaskTitle,
        todoListId: todoListId1,
        taskId: newTaskId
    }))

    expect(endState[todoListId1].length).toBe(7)
    expect(endState[todoListId1][6].title).toBe(newTaskTitle)

    expect(endState[todoListId2].length).toBe(2)
    expect(endState[todoListId1].length).toBe(7)
    expect(endState[todoListId1][6].id).toBeDefined()
    expect(endState[todoListId1][6].title).toBe('New task')
    expect(endState[todoListId1][6].isDone).toBe(false)
})

test('correct task should change its name', () => {
    const newTitle = 'New Title TodoList'

    const endState = tasksReducer(startState, changeTaskTitleAC({taskId: todoList1IDs[0], todoListId: todoListId1, title: newTitle}))

    expect(endState[todoListId1].length).toBe(6)
    expect(endState[todoListId1][0].title).toBe(newTitle)
})

test('correct task should change its status', () => {
    const endState = tasksReducer(startState, changeTaskStatusAC({taskId: todoList1IDs[0], todoListId: todoListId1, status: false}))

    expect(endState[todoListId1].length).toBe(6)
    expect(endState[todoListId1][0].isDone).toBe(false)
})

test('new array should be added when new todolist is added', () => {
    const newTodoListTitle = 'New TodoList'
    const endState = tasksReducer(startState, addTodolistAC({title: newTodoListTitle}))

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== todoListId1 && k !== todoListId2)
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})
