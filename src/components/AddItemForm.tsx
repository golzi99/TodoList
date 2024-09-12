import React, {useState} from 'react';
import {Input} from './Input';
import {Button} from './Button';
import {FlexWrapper} from './FlexWrapper';
import styled from 'styled-components';

type AddItemFormPropsType = {
    addItem: (title: string) => void,
    maxLength: number
}

export const AddItemForm = ({addItem, maxLength}: AddItemFormPropsType) => {

    const [title, setTitle] = useState('')
    const [inputError, setInputError] = useState(false)

    const inputEmpty = !title
    const userErrorLengthMessage = title.length > maxLength
    const userLengthMessage = `You have ${maxLength - title.length} characters left`

    const addTaskOnClick = () => {
        const trimmedTitle = title.trim()
        if (!inputEmpty && !userErrorLengthMessage && trimmedTitle) {
            addItem(trimmedTitle)
        } else {
            setInputError(true)
        }
        setTitle('')
    }

    return (
        <div>
            <FlexWrapper gap={'8px'}>
                <Input title={title} setTitle={setTitle} onEnter={addTaskOnClick} error={inputError}
                       setInputError={setInputError}/>
                <Button title={'+'} callBack={addTaskOnClick}
                        disabled={inputEmpty || userErrorLengthMessage || inputError}/>
            </FlexWrapper>
            {inputEmpty && !inputError && <p>Max length task title is {maxLength} charters</p>}
            {!inputEmpty && !userErrorLengthMessage && !inputError && <p>{userLengthMessage}</p>}
            {userErrorLengthMessage && !inputError && <ErrorMessage>Task title is to long</ErrorMessage>}
            {inputError && <ErrorMessage>Task title required</ErrorMessage>}
        </div>

    );
};

const ErrorMessage = styled.p`
  color: red;
`
