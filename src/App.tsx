import React, {useState} from 'react';
import './App.css';
import {Todolist} from './components/Todolist';
import {FilterValuesType, TodolistType} from './types/types';
import {v1} from 'uuid';

function App() {
    const removeTask = (id: string, todoListId: string) => {
        let tempTasksList = {...tasks}
        let tasksList = tempTasksList[todoListId]
        let filteredTasks = tasksList.filter(t => t.id !== id)
        tempTasksList = {...tasks, [todoListId]: filteredTasks}
        setTasks(tempTasksList)
    }

    const changeTaskStatus = (id: string, checked: boolean, todoListId: string) => {
        let tempTasksList = {...tasks}
        let tasksList = tempTasksList[todoListId]
        const doneTasks = tasksList.map(t => t.id === id ? {...t, isDone: checked} : t)
        tempTasksList = {...tasks, [todoListId]: doneTasks}
        setTasks(tempTasksList)
    }

    const changeFilter = (value: FilterValuesType, todoListId: string) => {
        let tempTodolist = todoLists.map(tl => tl.id === todoListId ? {...tl, filter: value} : tl)
        setTodoLists(tempTodolist)
    }

    const addTask = (title: string, todoListId: string) => {
        let tempTasksList = {...tasks}
        let tasksList = tempTasksList[todoListId]
        let newTask = {id: v1(), title: title, isDone: false}
        tasksList = [...tasksList, newTask]
        tempTasksList = {...tasks, [todoListId]: tasksList}
        setTasks(tempTasksList)
    }

    const removeTodoList = (todoListId: string) => {
        let filteredTodoList = todoLists.filter(tl => tl.id !== todoListId)
        setTodoLists(filteredTodoList)
        let newTasks = { ...tasks };
        delete newTasks[todoListId]
        setTasks(newTasks)
    }

    const todoListId1 = v1()
    const todoListId2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodolistType>>([
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'}
    ])

    const [tasks, setTasks] = useState({
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
    })

    return (
        <div className="App">
            {todoLists.map((tl) => {
                    let tasksForTodoList = tasks[tl.id]
                    if (tl.filter === 'active') {
                        tasksForTodoList = tasksForTodoList.filter(t => !t.isDone)
                    } else if (tl.filter === 'completed') {
                        tasksForTodoList = tasksForTodoList.filter(t => t.isDone)
                    }

                    return (
                        <Todolist key={tl.id}
                                  id={tl.id}
                                  title={tl.title}
                                  tasks={tasksForTodoList}
                                  removeTask={removeTask}
                                  changeFilter={changeFilter}
                                  addTask={addTask}
                                  changeTaskStatus={changeTaskStatus}
                                  filter={tl.filter}
                                  removeTodoList={removeTodoList}
                        />
                    )
                }
            )}
        </div>
    );
}

export default App;
