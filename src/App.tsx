import React, {useState} from 'react';
import './App.css';
import {Todolist} from './components/Todolist/Todolist';
import {FilterValuesType, TasksStateType, TodoListType} from './types/types';
import {v1} from 'uuid';
import {AddItemForm} from './components/AddItemForm';
import ButtonAppBar from './components/ButtonAppBar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import {createTheme, ThemeProvider} from '@mui/material/styles';


function App() {
    const updateTitleTaskHandler = (taskId: string, todoListId: string, updateTitle: string) => {
        const updateTaskTitle = tasks[todoListId].map(task => task.id === taskId ? {...task, title: updateTitle} : task)
        const tempTasksList = {...tasks, [todoListId]: updateTaskTitle}
        setTasks(tempTasksList)
    }

    const updateTitleTodoListHandler = (todolistId: string, updateTodoListTitle: string) => {
        const tempTodoList = todoLists.map(tl => tl.id === todolistId ? {...tl, title: updateTodoListTitle} : tl)
        setTodoLists(tempTodoList)
    }

    const addTodoList = (todoListTitle: string) => {
        const todolistId = v1()
        const newTodoList: TodoListType = {id: todolistId, title: todoListTitle, filter: 'all'}
        setTodoLists([...todoLists, newTodoList])
        setTasks({...tasks, [todolistId]: []})
    }

    const removeTask = (taskId: string, todoListId: string) => {
        const filteredTasks = tasks[todoListId].filter(t => t.id !== taskId)
        const tempTasksList = {...tasks, [todoListId]: filteredTasks}
        setTasks(tempTasksList)
    }

    const changeTaskStatus = (taskId: string, checked: boolean, todoListId: string) => {
        const doneTasks = tasks[todoListId].map(t => t.id === taskId ? {...t, isDone: checked} : t)
        const tempTasksList = {...tasks, [todoListId]: doneTasks}
        setTasks(tempTasksList)
    }

    const changeFilter = (value: FilterValuesType, todoListId: string) => {
        let tempTodolist = todoLists.map(tl => tl.id === todoListId ? {...tl, filter: value} : tl)
        setTodoLists(tempTodolist)
    }

    const addTask = (taskTitle: string, todoListId: string) => {
        let newTask = {id: v1(), title: taskTitle, isDone: false}
        const tasksList = [...tasks[todoListId], newTask]
        const tempTasksList = {...tasks, [todoListId]: tasksList}
        setTasks(tempTasksList)
    }

    const removeTodoList = (todoListId: string) => {
        let filteredTodoList = todoLists.filter(tl => tl.id !== todoListId)
        setTodoLists(filteredTodoList)
        let newTasks = {...tasks};
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

    const theme = createTheme({
        palette: {
            primary: {
                main: '#95d97b',
            }
        },
    })

    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <Container>
                    <ButtonAppBar/>
                    <Grid container sx={{p: '30px'}}>
                        <AddItemForm addItem={addTodoList} maxLength={30}/>
                    </Grid>
                    <Grid container spacing={4}>
                        {todoLists.map((tl) => {
                                let tasksForTodoList = tasks[tl.id]
                                if (tl.filter === 'active') {
                                    tasksForTodoList = tasksForTodoList.filter(t => !t.isDone)
                                } else if (tl.filter === 'completed') {
                                    tasksForTodoList = tasksForTodoList.filter(t => t.isDone)
                                }

                                return (
                                    <Grid>
                                        <Paper sx={{p: '5px 20px 20px 20px'}} elevation={5}>
                                            <Todolist key={tl.id}
                                                      todoListId={tl.id}
                                                      todoListTitle={tl.title}
                                                      tasks={tasksForTodoList}
                                                      removeTask={removeTask}
                                                      changeFilter={changeFilter}
                                                      addTask={addTask}
                                                      changeTaskStatus={changeTaskStatus}
                                                      filter={tl.filter}
                                                      removeTodoList={removeTodoList}
                                                      updateTitleTodoList={updateTitleTodoListHandler}
                                                      updateTitleTask={updateTitleTaskHandler}
                                            />
                                        </Paper>
                                    </Grid>
                                )
                            }
                        )}
                    </Grid>
                </Container>
            </ThemeProvider>
        </div>
    );
}

export default App;
