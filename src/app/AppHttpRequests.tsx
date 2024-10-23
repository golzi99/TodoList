import Checkbox from '@mui/material/Checkbox'
import React, {ChangeEvent, useEffect, useState} from 'react'
import {EditableSpan} from '../common/components/EditableSpan/EditableSpan';
import {AddItemForm} from '../common/components/AddItemForm/AddItemForm';
import {Todolist} from '../features/todolists/api/todolistsApi.types';
import {DomainTask, Tasks} from '../features/todolists/api/tasksApi.types';
import {todolistsApi} from '../features/todolists/api/todolistsApi';
import {tasksApi} from '../features/todolists/api/tasksApi';

export const AppHttpRequests = () => {
    const [todolists, setTodolists] = useState<Array<Todolist>>([])
    const [tasks, setTasks] = useState<Tasks>({})

    useEffect(() => {
        // get todolists
        todolistsApi.getTodolists().then((res) => {
            const todolists = res.data
            setTodolists(todolists)
            todolists.forEach((tl) => {
                tasksApi.getTasks(tl.id).then((res) => {
                    setTasks(prev => ({...prev, [tl.id]: res.data.items}))
                })
            })
        })
    }, [])

    const createTodolistHandler = (title: string) => {
        // create todolist
        todolistsApi.createTodolist(title).then((res) => {
            const newTodolist = res.data.data.item
            setTodolists([newTodolist, ...todolists])
        })
    }

    const removeTodolistHandler = (id: string) => {
        // remove todolist
        todolistsApi.removeTodolist(id).then(() => {
            const newTodolists = todolists.filter((tl) => tl.id !== id)
            setTodolists(newTodolists)
        })
    }

    const updateTodolistHandler = (id: string, title: string) => {
        // update todolist title
        todolistsApi.updateTodolist({id, title}).then(() => {
            const newTodolists = todolists.map((tl) => tl.id === id ? {...tl, title} : tl)
            setTodolists(newTodolists)
        })
    }

    const createTaskHandler = (title: string, todolistId: string) => {
        // create task
        tasksApi.createTask({title, todolistId}).then((res) => {
            const newTask = res.data.data.item
            setTasks({...tasks, [todolistId]: [newTask, ...(tasks[todolistId] || [])]})
        })
    }

    const removeTaskHandler = (taskId: string, todolistId: string) => {
        // remove task
        tasksApi.removeTask({taskId, todolistId}).then(() => {
            setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)})
        })
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, task: DomainTask, todolistId: string) => {
        // update task status
        tasksApi.updateTaskStatus({e, task, todolistId}).then((res) => {
            const newTask = res.data.data.item
            setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === task.id ? newTask : t)})
        })
    }

    const changeTaskTitleHandler = (title: string, task: DomainTask, todolistId: string) => {
        // update task title
        tasksApi.updateTaskTitle({title, todolistId, task}).then((res) => {
            const newTask = res.data.data.item
            setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === task.id ? newTask : t)})
        })
    }

    return (
        <div style={{margin: '20px'}}>
            <AddItemForm addItem={createTodolistHandler}/>

            {/* Todolists */}
            {todolists.map((tl) => {
                return (
                    <div key={tl.id} style={todolist}>
                        <div>
                            <EditableSpan
                                value={tl.title}
                                onChange={(title: string) => updateTodolistHandler(tl.id, title)}
                            />
                            <button onClick={() => removeTodolistHandler(tl.id)}>x</button>
                        </div>
                        <AddItemForm addItem={title => createTaskHandler(title, tl.id)}/>

                        {/* Tasks */}
                        {!!tasks[tl.id] &&
                            tasks[tl.id].map((task) => {
                                return (
                                    <div key={task.id}>
                                        <Checkbox
                                            checked={task.status === 2}
                                            onChange={e => changeTaskStatusHandler(e, task, tl.id)}
                                        />
                                        <EditableSpan
                                            value={task.title}
                                            onChange={title => changeTaskTitleHandler(title, task, tl.id)}
                                        />
                                        <button onClick={() => removeTaskHandler(task.id, tl.id)}>x</button>
                                    </div>
                                )
                            })}
                    </div>
                )
            })}
        </div>
    )
}

// Styles
const todolist: React.CSSProperties = {
    border: '1px solid black',
    margin: '20px 0',
    padding: '10px',
    width: '300px',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
}