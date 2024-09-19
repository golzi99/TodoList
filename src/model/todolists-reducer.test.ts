import {TodoListType} from '../types/types';
import {v1} from 'uuid';
import {todolistsReducer} from './todolists-reducer';

const todoListId1 = v1()
const todoListId2 = v1()

let startState: Array<TodoListType> = []

beforeEach(() => {
    startState = [
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'}
    ]
})

test('remove todolist', () => {
    const action = {
        type: 'REMOVE-TODOLIST',
        payload: {
            id: todoListId1
        }
    } as const

    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListId2)
})