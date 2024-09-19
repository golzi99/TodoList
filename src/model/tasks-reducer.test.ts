import {TasksStateType} from '../types/types';
import {v1} from 'uuid';

const todoListId1 = v1()
const todoListId2 = v1()

let startState: TasksStateType = {}

beforeEach(() => {
    startState = {
        [todoListId1]: [
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
            {id: v1(), title: 'Typescript', isDone: false},
            {id: v1(), title: 'RTK query', isDone: false}
        ],
        [todoListId2]: [
            {id: v1(), title: 'Book', isDone: false},
            {id: v1(), title: 'Milk', isDone: true},
        ]
    }
})

// test('correct task should be removed', () => {
//     const endState = tasksReducer(startState, removeTask(todoListId1))
//
//     expect(endState.length).toBe(1)
//     expect(endState[0].id).toBe(todoListId2)
// })
//
// test('correct task should be added', () => {
//     const newTodoListTitle = 'New TodoList'
//     const endState = tasksReducer(startState, addTodolist(newTodoListTitle))
//
//     expect(endState.length).toBe(3)
//     expect(endState[2].title).toBe(newTodoListTitle)
// })
//
// test('correct task should change its name', () => {
//     const newTitle = 'New Title TodoList'
//
//     const endState = tasksReducer(startState, changeTodoListTitle(todoListId2, newTitle))
//
//     expect(endState.length).toBe(2)
//     expect(endState[1].title).toBe(newTitle)
//     expect(endState[1].id).toBe(todoListId2)
// })
//
// test('correct task should change its status', () => {
//     const newFilter1 = 'active'
//     const newFilter2 = 'completed'
//
//     const endState1 = tasksReducer(startState, changeTodoListFilter(todoListId2, newFilter1))
//     const endState2 = tasksReducer(startState, changeTodoListFilter(todoListId2, newFilter2))
//
//     expect(endState1.length).toBe(2)
//     expect(endState1[1].filter).toBe(newFilter1)
//     expect(endState1[1].id).toBe(todoListId2)
//
//     expect(endState2.length).toBe(2)
//     expect(endState2[1].filter).toBe(newFilter2)
//     expect(endState2[1].id).toBe(todoListId2)
// })
