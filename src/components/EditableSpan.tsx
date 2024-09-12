import React, {ChangeEvent, useState} from 'react';
import styled from 'styled-components';

type EditableSpanPropsType = {
    value: string,
    done: boolean
}

export const EditableSpan = ({value, done}: EditableSpanPropsType) => {
    const [itemTitle, setItemTitle] = useState(value)
    const [editMode, setEditMode] = useState(false)

    const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setItemTitle(event.currentTarget.value)
    }

    return (
        <div>
            {editMode ? <input type={'text'}
                               value={itemTitle}
                               onChange={changeTitle}
                               onBlur={() => {
                                   setEditMode(false)
                               }}
            /> : <Task done={done} onDoubleClick={() => {
                setEditMode(true)
            }}>
                {value}
            </Task>}
        </div>
    );
};

const Task = styled.span<{ done: boolean }>`
  font-weight: ${props => props.done ? '' : 'bold'};;
  text-decoration: ${props => props.done ? 'line-through' : 'none'};
  opacity: ${props => props.done  ? 0.5 : 1};
`