import React, {useState} from 'react';
import './App.css';
import {Todolist} from './components/Todolist';
import {FilterValues, TaskProps} from './types/types';

function App() {
    // let task2: Array<TaskProps> = [
    //     {id: 1, title: "Cola", isDone: true},
    //     {id: 2, title: "Whiskey", isDone: true},
    //     {id: 3, title: "Ice", isDone: false}
    // ]

    const [tasks1, setTasks] = useState<Array<TaskProps>>([
        {id: 1, title: "CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false},
        { id: 4, title: 'Redux', isDone: false },
        { id: 5, title: 'Typescript', isDone: false },
        { id: 6, title: 'RTK query', isDone: false }
    ])
    const [filter, setFilter] = useState<FilterValues>("all")

    const removeTask = (id: number) => {
        let filteredTasks = tasks1.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }

    const changeFilter = (value: FilterValues) => {
        setFilter(value)
    }

    let tasksForTodoList = tasks1
    if (filter === "active") {
        tasksForTodoList = tasks1.filter(t => !t.isDone)
    } else if (filter === "completed") {
        tasksForTodoList = tasks1.filter(t => t.isDone)
    }

    return (
        <div className="App">
           <Todolist title={"What to learn"} tasks={tasksForTodoList} removeTask={removeTask} changeFilter={changeFilter}/>
           {/*<Todolist title={"What to buy"} tasks={task2} removeTask={removeTask}/>*/}
        </div>
    );
}

export default App;
