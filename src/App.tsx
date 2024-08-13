import React from 'react';
import './App.css';
import {Todolist} from "./components/Todolist";
import { TaskProps } from './types/types';

function App() {

    let task1: Array<TaskProps> = [
        {id: 1, title: "CSS", isDone: true},
        {id: 1, title: "JS", isDone: true},
        {id: 1, title: "React", isDone: false}
    ]

    let task2: Array<TaskProps> = [
        {id: 1, title: "Cola", isDone: true},
        {id: 1, title: "Whiskey", isDone: true},
        {id: 1, title: "Ice", isDone: false}
    ]

    return (
        <div className="App">
           <Todolist title={"What to learn"} tasks={task1}/>
           <Todolist title={"What to buy"} tasks={task2}/>
        </div>
    );
}

export default App;
