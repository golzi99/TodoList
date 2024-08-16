import React, {useState} from 'react';
import './App.css';
import {Todolist} from './components/Todolist';
import {FilterValues, TaskProps} from './types/types';

function App() {
    const [tasks, setTasks] = useState<Array<TaskProps>>([
        {id: 1, title: 'CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: false},
        {id: 4, title: 'Redux', isDone: false},
        {id: 5, title: 'Typescript', isDone: false},
        {id: 6, title: 'RTK query', isDone: false}
    ])
    const [filter, setFilter] = useState<FilterValues>('all')

    const removeTask = (id: number) => {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }

    const taskDone = (id: number) => {
        const doneTasks = tasks.map(t => {
            if (t.id === id) {
                return {...t, isDone: !t.isDone}
            }
            return t
        })
        setTasks(doneTasks)
    }

    const changeFilter = (value: FilterValues) => {
        setFilter(value)
    }

    const addTask = (addedTask: TaskProps) => {
        setTasks([...tasks, addedTask])
    }

    let tasksForTodoList = tasks
    if (filter === 'active') {
        tasksForTodoList = tasks.filter(t => !t.isDone)
    } else if (filter === 'completed') {
        tasksForTodoList = tasks.filter(t => t.isDone)
    }

    return (
        <div className="App">
            <Todolist title={'What to learn'} tasks={tasksForTodoList} removeTask={removeTask}
                      changeFilter={changeFilter} addTask={addTask} taskDone={taskDone}/>
        </div>
    );
}

export default App;
