import React, {useReducer, useState} from 'react';
import './App.css';
import {Todolist} from './components/Todolist/Todolist';
import {FilterValuesType, ThemeModeType} from './types/types';
import {v1} from 'uuid';
import {AddItemForm} from './components/AddItemForm';
import ButtonAppBar from './components/ButtonAppBar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from './model/tasks-reducer';
import {
    addTodolistAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodolistAC,
    todolistsReducer
} from './model/todolists-reducer';


function App() {
    const updateTitleTaskHandler = (taskId: string, todoListId: string, updateTitle: string) => {
        // const updateTaskTitle = tasks[todoListId].map(task => task.id === taskId ? {...task, title: updateTitle} : task)
        // const tempTasksList = {...tasks, [todoListId]: updateTaskTitle}
        // setTasks(tempTasksList)
        dispatchTasks(changeTaskTitleAC({taskId: taskId, todoListId: todoListId, title: updateTitle}))
    }

    const updateTitleTodoListHandler = (todolistId: string, updateTodoListTitle: string) => {
        // const tempTodoList = todoLists.map(tl => tl.id === todolistId ? {...tl, title: updateTodoListTitle} : tl)
        // setTodoLists(tempTodoList)
        dispatchTodoLists(changeTodoListTitleAC({todolistId: todolistId, title: updateTodoListTitle}))
    }

    const addTodoList = (todoListTitle: string) => {
        // const todolistId = v1()

        // const newTodoList: TodoListType = {id: todolistId, title: todoListTitle, filter: 'all'}
        // setTodoLists([...todoLists, newTodoList])
        // setTasks({...tasks, [todolistId]: []})

        // dispatchTodoLists(addTodolistAC({idTodolist: todolistId, title: todoListTitle}))
        // dispatchTasks(createEmptyTodoListOfTasksAC({idTodoList: todolistId}))

        const action = addTodolistAC({title: todoListTitle})

        dispatchTodoLists(action)
        dispatchTasks(action)
    }

    const removeTask = (taskId: string, todoListId: string) => {
        // const filteredTasks = tasks[todoListId].filter(t => t.id !== taskId)
        // const tempTasksList = {...tasks, [todoListId]: filteredTasks}
        // setTasks(tempTasksList)
        dispatchTasks(removeTaskAC({taskId: taskId, todoListId: todoListId}))
    }

    const changeTaskStatus = (taskId: string, checked: boolean, todoListId: string) => {
        // const doneTasks = tasks[todoListId].map(t => t.id === taskId ? {...t, isDone: checked} : t)
        // const tempTasksList = {...tasks, [todoListId]: doneTasks}
        // setTasks(tempTasksList)
        dispatchTasks(changeTaskStatusAC({taskId: taskId, todoListId: todoListId, status: checked}))
    }

    const changeFilter = (value: FilterValuesType, todoListId: string) => {
        // let tempTodolist = todoLists.map(tl => tl.id === todoListId ? {...tl, filter: value} : tl)
        // setTodoLists(tempTodolist)
        dispatchTodoLists(changeTodoListFilterAC({todolistId: todoListId, filter: value}))
    }

    const addTask = (taskTitle: string, todoListId: string) => {
        // let newTask = {id: v1(), title: taskTitle, isDone: false}
        // const tasksList = [...tasks[todoListId], newTask]
        // const tempTasksList = {...tasks, [todoListId]: tasksList}
        // setTasks(tempTasksList)
        const newTaskId = v1()
        dispatchTasks(addTaskAC({title: taskTitle, todoListId: todoListId, taskId: newTaskId}))
    }

    const removeTodoList = (todoListId: string) => {
        // let filteredTodoList = todoLists.filter(tl => tl.id !== todoListId)
        // setTodoLists(filteredTodoList)
        // let newTasks = {...tasks};
        // delete newTasks[todoListId]
        // setTasks(newTasks)
        const action = removeTodolistAC({todolistId: todoListId})

        dispatchTodoLists(action)
        dispatchTasks(action)
    }

    const todoListId1 = v1()
    const todoListId2 = v1()

    // const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
    //     {id: todoListId1, title: 'What to learn', filter: 'all'},
    //     {id: todoListId2, title: 'What to buy', filter: 'all'}
    // ])

    // const [tasks, setTasks] = useState<TasksStateType>({
    //     [todoListId1]: [
    //         {id: v1(), title: 'CSS', isDone: true},
    //         {id: v1(), title: 'JS', isDone: true},
    //         {id: v1(), title: 'React', isDone: false},
    //         {id: v1(), title: 'Redux', isDone: false},
    //         {id: v1(), title: 'Typescript', isDone: false},
    //         {id: v1(), title: 'RTK query', isDone: false}
    //     ],
    //     [todoListId2]: [
    //         {id: v1(), title: 'Book', isDone: false},
    //         {id: v1(), title: 'Milk', isDone: true},
    //     ]
    // })

    const [todoLists, dispatchTodoLists] = useReducer(todolistsReducer, [
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'}
    ])

    const [tasks, dispatchTasks] = useReducer(tasksReducer, {
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

    const todoListsComponent: Array<JSX.Element> = todoLists.map((tl) => {
        let tasksForTodoList = tasks[tl.id]
        if (tl.filter === 'active') {
            tasksForTodoList = tasksForTodoList.filter(t => !t.isDone)
        } else if (tl.filter === 'completed') {
            tasksForTodoList = tasksForTodoList.filter(t => t.isDone)
        }

        return (
            <Grid key={tl.id}>
                {/*<Paper sx={{p: '5px 20px 20px 20px'}} elevation={5}>*/}
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
                {/*</Paper>*/}
            </Grid>
        )
    })


    const [themeMode, setThemeMode] = useState<ThemeModeType>('dark')

    const changeModeHandler = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }

    const theme = createTheme({
        palette: {
            mode: themeMode === 'light' ? 'light' : 'dark',
            primary: {
                main: '#d06905',
            }
        },
    })

    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <Container>
                    <ButtonAppBar onChange={changeModeHandler}/>
                    <Grid container sx={{p: '30px'}}>
                        <AddItemForm addItem={addTodoList} maxLength={30}/>
                    </Grid>
                    <Grid container spacing={4}>
                        {todoListsComponent}
                    </Grid>
                </Container>
                <CssBaseline/>
            </ThemeProvider>
        </div>
    );
}

export default App;
