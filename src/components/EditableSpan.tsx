import React, {useState} from 'react';
import styled from 'styled-components';
import {Input} from './Input';

type EditableSpanPropsType = {
    value: string,
    done?: boolean,
    reWriteTitle: (title: string) => void,
    maxLength?: number
}

export const EditableSpan = ({value, done, reWriteTitle, maxLength = 10}: EditableSpanPropsType) => {
    const [itemTitle, setItemTitle] = useState(value)
    const [editMode, setEditMode] = useState(false)
    const [inputError, setInputError] = useState(false)

    const inputEmpty = !itemTitle
    const userErrorLengthMessage = itemTitle.length > maxLength
    const userLengthMessage = `You have ${maxLength - itemTitle.length} characters left`

    const rebuildTitle = () => {
        const trimmedTitle = itemTitle.trim()
        if (!inputEmpty && !userErrorLengthMessage && trimmedTitle) {
            reWriteTitle(trimmedTitle)
            setEditMode(false)
        } else {
            setInputError(true)
        }
        setItemTitle(trimmedTitle)
    }

    return (
        <div>
            {editMode ? <Input value={itemTitle}
                               setValue={setItemTitle}
                               error={inputError}
                               setInputError={setInputError}
                               onEnter={rebuildTitle}
                               onBlur={rebuildTitle}
                               autoFocus={true}
                /> :
                <Task done={done} onDoubleClick={() => {
                    setEditMode(true)
                }}>{value}
                </Task>}
        </div>
    );
};

const Task = styled.span<{ done?: boolean }>`
  font-weight: ${props => props.done ? '' : 'bold'};;
  text-decoration: ${props => props.done ? 'line-through' : 'none'};
  opacity: ${props => props.done  ? 0.5 : 1};
`