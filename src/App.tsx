import React, {useState} from 'react';
import './App.css';
import {Todolist} from './components/Todolist';
import {FilterValuesType, TasksStateType, TodoListType} from './types/types';
import {v1} from 'uuid';
import {AddItemForm} from './components/AddItemForm';

function App() {
    const setNewTitleTask = (taskId: string, todoListId: string, newTitle: string) => {
        const newTaskTitle = tasks[todoListId].map(task => task.id === taskId ? {...task, title: newTitle}: task)
        const tempTasksList = {...tasks, [todoListId]: newTaskTitle}
        setTasks(tempTasksList)
    }

    const setNewTitleTodoList = (todolistId: string, title: string) => {
        const newTodoListTitle = todoLists.map(tl => tl.id === todolistId ? {...tl, title: title} : tl)
        setTodoLists(newTodoListTitle)
    }

    const addTodoList = (title: string) => {
        const todolistId = v1()
        const newTodoList: TodoListType = {id: todolistId, title: title, filter: 'all'}
        setTodoLists([...todoLists, newTodoList])
        setTasks({...tasks, [todolistId]: []})
    }

    const removeTask = (id: string, todoListId: string) => {
        const filteredTasks = tasks[todoListId].filter(t => t.id !== id)
        const tempTasksList = {...tasks, [todoListId]: filteredTasks}
        setTasks(tempTasksList)
    }

    const changeTaskStatus = (id: string, checked: boolean, todoListId: string) => {
        const doneTasks = tasks[todoListId].map(t => t.id === id ? {...t, isDone: checked} : t)
        const tempTasksList = {...tasks, [todoListId]: doneTasks}
        setTasks(tempTasksList)
    }

    const changeFilter = (value: FilterValuesType, todoListId: string) => {
        let tempTodolist = todoLists.map(tl => tl.id === todoListId ? {...tl, filter: value} : tl)
        setTodoLists(tempTodolist)
    }

    const addTask = (title: string, todoListId: string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        const tasksList = [...tasks[todoListId], newTask]
        const tempTasksList = {...tasks, [todoListId]: tasksList}
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

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'}
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
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
            <AddItemForm addItem={addTodoList} maxLength={30}/>
            {todoLists.map((tl) => {
                    let tasksForTodoList = tasks[tl.id]
                    if (tl.filter === 'active') {
                        tasksForTodoList = tasksForTodoList.filter(t => !t.isDone)
                    } else if (tl.filter === 'completed') {
                        tasksForTodoList = tasksForTodoList.filter(t => t.isDone)
                    }

                    return (
                        <Todolist key={tl.id}
                                  todoListId={tl.id}
                                  title={tl.title}
                                  tasks={tasksForTodoList}
                                  setNewTitle={setNewTitleTask}
                                  removeTask={removeTask}
                                  changeFilter={changeFilter}
                                  addTask={addTask}
                                  changeTaskStatus={changeTaskStatus}
                                  filter={tl.filter}
                                  removeTodoList={removeTodoList}
                                  setNewTitleTodoList={setNewTitleTodoList}
                        />
                    )
                }
            )}
        </div>
    );
}

export default App;
