import React from 'react';
import {TodolistType} from '../../types/types';
import {AddItemForm} from '../AddItemForm';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {FilterTasksButtons} from '../../FilterTasksButtons';
import {Tasks} from '../../Tasks';
import {TodolistTitle} from '../../TodolistTitle';
import {addTaskAC} from '../../model/tasks-reducer';
import {useDispatch} from 'react-redux';


type Props = {
    todolist: TodolistType,
}

export const Todolist = ({todolist,}: Props) => {

    const dispatch = useDispatch()

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
