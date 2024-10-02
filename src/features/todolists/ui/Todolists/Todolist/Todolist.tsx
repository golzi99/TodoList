import React from 'react';
import {TodolistType} from '../../../../../common/types/types';
import {AddItemForm} from '../../../../../common/components/AddItemForm/AddItemForm';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {FilterTasksButtons} from './FilterTasksButtons/FilterTasksButtons';
import {Tasks} from './Tasks/Tasks';
import {TodolistTitle} from './TodolistTitle/TodolistTitle';
import {addTaskAC} from '../../../model/tasks-reducer';
import {useAppDispatch} from '../../../../../common/hooks/useAppDispatch';


type Props = {
    todolist: TodolistType,
}

export const Todolist = ({todolist,}: Props) => {

    const dispatch = useAppDispatch()

    const {id} = todolist

    const addNewTask = (title: string) => {
        dispatch(addTaskAC({title, todolistId: id}))
    }

    return (
        <div>
            <Accordion>
                <AccordionSummary expandIcon={<ArrowDownwardIcon/>}>
                    <TodolistTitle todolist={todolist}/>
                </AccordionSummary>
                <AccordionDetails>
                    <AddItemForm addItem={addNewTask} maxLength={10}/>
                    <Tasks todolist={todolist}/>
                    <FilterTasksButtons todolist={todolist}/>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}
