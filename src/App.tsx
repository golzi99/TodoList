import React from 'react';
import './App.css';
import {Todolist} from "./components/Todolist";

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean
}

function App() {

    let task1: Array<TaskType> = [
        {id: 1, title: "CSS", isDone: true},
        {id: 1, title: "JS", isDone: true},
        {id: 1, title: "React", isDone: false}
    ]

    let task2: Array<TaskType> = [
        {id: 1, title: "Terminator", isDone: true},
        {id: 1, title: "XXX", isDone: true},
        {id: 1, title: "Sonic", isDone: false}
    ]

    let task3: Array<TaskType> = [
        {id: 1, title: "Eggs", isDone: true},
        {id: 1, title: "Beacon", isDone: true},
        {id: 1, title: "Rice", isDone: false}
    ]

    return (
        <div className="App">
           <Todolist title={"What to learn"} tasks={task1}/>
           <Todolist title={"Movies"}  tasks={task2}/>
           <Todolist title={"Make dishes"} tasks={task3}/>
        </div>
    );
}

export default App;
