import React, {useState} from 'react';
import './App.css';
import {Todolist} from './components/Todolist';
import {FilterValuesType, TaskPropsType} from './types/types';
import {v1} from 'uuid';

function App() {
    const [tasks, setTasks] = useState<Array<TaskPropsType>>([
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
        {id: v1(), title: 'Typescript', isDone: false},
        {id: v1(), title: 'RTK query', isDone: false}
    ])
    const [filter, setFilter] = useState<FilterValuesType>('all')

    const removeTask = (id: string) => {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }

    const taskDone = (id: string, checked: boolean) => {
        const doneTasks = tasks.map(t => {
            if (t.id === id) {
                return {...t, isDone:checked}
            }
            return t
        })
        setTasks(doneTasks)
    }

    const changeFilter = (value: FilterValuesType) => {
        setFilter(value)
    }

    const addTask = (title: string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        setTasks([newTask, ...tasks])
    }

    let tasksForTodoList = tasks
    if (filter === 'active') {
        tasksForTodoList = tasks.filter(t => !t.isDone)
    } else if (filter === 'completed') {
        tasksForTodoList = tasks.filter(t => t.isDone)
    }

    return (
        <div className="App">
            <Todolist title={'What to learn'}
                      tasks={tasksForTodoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      taskDone={taskDone}
            />
        </div>
    );
}

export default App;
