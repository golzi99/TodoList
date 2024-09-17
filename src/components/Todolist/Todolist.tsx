import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskPropsType} from '../../types/types';
import {AddItemForm} from '../AddItemForm';
import {EditableSpan} from '../EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';
import {getListItemSx} from './Todolist.styles';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


type TodolistProps = {
    todoListId: string
    todoListTitle: string,
    tasks: Array<TaskPropsType>,
    filter: FilterValuesType,

    removeTask: (id: string, todoListId: string) => void,
    addTask: (title: string, todoListId: string) => void,
    changeTaskStatus: (id: string, checked: boolean, todoListId: string) => void,
    updateTitleTask: (taskId: string, todoListId: string, newTitle: string) => void,

    changeFilter: (value: FilterValuesType, todoListId: string) => void,
    removeTodoList: (todoListId: string) => void,
    updateTitleTodoList: (todolistId: string, title: string) => void
}

export const Todolist = ({
                             todoListId,
                             todoListTitle,
                             tasks,
                             removeTask,
                             changeFilter,
                             addTask,
                             changeTaskStatus,
                             filter,
                             removeTodoList,
                             updateTitleTask,
                             updateTitleTodoList
                         }: TodolistProps) => {

    const addTaskOnClick = (title: string) => {
        addTask(title, todoListId)
    }

    const removeTaskOnClick = (taskId: string) => {
        removeTask(taskId, todoListId)
    }

    const setFilterHandlerCreator = (newFilterValue: FilterValuesType) => () => {
        changeFilter(newFilterValue, todoListId)
    }


    const tasksList: Array<JSX.Element> = tasks.map((task) => {
        const onRemoveHandler = () => removeTaskOnClick(task.id)

        const onChangeStatus = (event: ChangeEvent<HTMLInputElement>) => {
            changeTaskStatus(task.id, event.currentTarget.checked, todoListId)
        }

        const changeTaskTitle = (taskTitle: string) => {
            updateTitleTask(task.id, todoListId, taskTitle)
        }

        return (
            <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
                <div>
                    <Checkbox checked={task.isDone} onChange={onChangeStatus}/>
                    <EditableSpan value={task.title} updateTitle={changeTaskTitle}/>
                </div>
                <IconButton aria-label="delete" onClick={onRemoveHandler}>
                    <DeleteIcon/>
                </IconButton>
            </ListItem>
        )
    })

    const onClickRemoveTodoList = () => {
        removeTodoList(todoListId)
    }

    const onTitleClick = (todoListTitle: string) => {
        updateTitleTodoList(todoListId, todoListTitle)
    }

    return (
        <div>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon/>}
                                  id="panel1-header">
                    <h3>
                        <EditableSpan value={todoListTitle} updateTitle={onTitleClick} maxLength={30}/>
                        <IconButton aria-label="delete" onClick={onClickRemoveTodoList}>
                            <DeleteIcon/>
                        </IconButton>
                    </h3>
                </AccordionSummary>
                <AccordionDetails>
                    <AddItemForm addItem={addTaskOnClick} maxLength={10}/>
                    {tasks.length === 0 ? <p>Тасок нет</p> :
                        <List>
                            {tasksList}
                        </List>
                    }
                    <Box display={'flex'} justifyContent={'space-between'} gap={'10px'}>
                        <Button variant={filter === 'all' ? 'outlined' : 'text'} color={'success'}
                                onClick={setFilterHandlerCreator('all')}>
                            All
                        </Button>
                        <Button variant={filter === 'active' ? 'outlined' : 'text'} color="error"
                                onClick={setFilterHandlerCreator('active')}>
                            Active
                        </Button>
                        <Button variant={filter === 'completed' ? 'outlined' : 'text'} color="secondary"
                                onClick={setFilterHandlerCreator('completed')}>
                            Completed
                        </Button>
                    </Box>
                </AccordionDetails>
            </Accordion>
            {/*<h3>*/}
            {/*    <EditableSpan value={todoListTitle} updateTitle={onTitleClick} maxLength={30}/>*/}
            {/*    <IconButton aria-label="delete" onClick={onClickRemoveTodoList}>*/}
            {/*        <DeleteIcon/>*/}
            {/*    </IconButton>*/}
            {/*</h3>*/}
            {/*<AddItemForm addItem={addTaskOnClick} maxLength={10}/>*/}
            {/*{tasks.length === 0 ? <p>Тасок нет</p> :*/}
            {/*    <List>*/}
            {/*        {tasksList}*/}
            {/*    </List>*/}
            {/*}*/}
            {/*<Box display={'flex'} justifyContent={'space-between'} gap={'10px'}>*/}
            {/*    <Button variant={filter === 'all' ? 'outlined' : 'text'} color={'success'}*/}
            {/*            onClick={setFilterHandlerCreator('all')}>*/}
            {/*        All*/}
            {/*    </Button>*/}
            {/*    <Button variant={filter === 'active' ? 'outlined' : 'text'} color="error"*/}
            {/*            onClick={setFilterHandlerCreator('active')}>*/}
            {/*        Active*/}
            {/*    </Button>*/}
            {/*    <Button variant={filter === 'completed' ? 'outlined' : 'text'} color="secondary"*/}
            {/*            onClick={setFilterHandlerCreator('completed')}>*/}
            {/*        Completed*/}
            {/*    </Button>*/}
            {/*</Box>*/}
        </div>
    )
}
