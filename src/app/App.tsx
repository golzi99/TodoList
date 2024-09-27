import React, {useState} from 'react';
import './App.css';
import {Todolist} from '../components/Todolist/Todolist';
import {FilterValuesType, TasksStateType, ThemeModeType, TodoListType} from '../types/types';
import {AddItemForm} from '../components/AddItemForm';
import ButtonAppBar from '../components/ButtonAppBar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from '../model/tasks-reducer';
import {
    addTodolistAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodolistAC
} from '../model/todolists-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from './store';


function App() {

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

    const dispatch = useDispatch()

    const todolists = useSelector<RootState, Array<TodoListType>>(state => state.todolists)
    const tasks = useSelector<RootState, TasksStateType>(state => state.tasks)

    const updateTitleTaskHandler = (taskId: string, todolistId: string, updateTitle: string) => {
        dispatch(changeTaskTitleAC({taskId, todolistId, title: updateTitle}))
    }

    const updateTitleTodoListHandler = (todolistId: string, updateTodoListTitle: string) => {
        dispatch(changeTodoListTitleAC({todolistId, title: updateTodoListTitle}))
    }

    const addTodoList = (todolistTitle: string) => {
        dispatch(addTodolistAC(todolistTitle))
    }

    const removeTask = (taskId: string, todolistId: string) => {
        dispatch(removeTaskAC({taskId, todolistId}))
    }

    const changeTaskStatus = (taskId: string, checked: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC({taskId, todolistId, status: checked}))
    }

    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        dispatch(changeTodoListFilterAC({todolistId, filter: value}))
    }

    const addTask = (taskTitle: string, todolistId: string) => {
        dispatch(addTaskAC({title: taskTitle, todolistId}))
    }

    const removeTodoList = (todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    }

    const todoListsComponent: Array<JSX.Element> = todolists.map((tl) => {
        let tasksForTodoList = tasks[tl.id]
        if (tl.filter === 'active') {
            tasksForTodoList = tasksForTodoList.filter(t => !t.isDone)
        } else if (tl.filter === 'completed') {
            tasksForTodoList = tasksForTodoList.filter(t => t.isDone)
        }

        return (
            <Grid key={tl.id}>
                <Paper elevation={5} sx={{border: `1px solid ${theme.palette.primary.main}`}}>
                <Todolist todoListId={tl.id}
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
