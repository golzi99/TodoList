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

    const addItemOnClick = () => {
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
                <Input value={title} setValue={setTitle} onEnter={addItemOnClick} error={inputError}
                       setInputError={setInputError}/>
                <Button title={'+'} callBack={addItemOnClick}
                        disabled={inputEmpty || userErrorLengthMessage || inputError}/>
            </FlexWrapper>
            {inputEmpty && !inputError && <p>Max length title is {maxLength} charters</p>}
            {!inputEmpty && !userErrorLengthMessage && !inputError && <p>{userLengthMessage}</p>}
            {userErrorLengthMessage && !inputError && <ErrorMessage>Title is to long</ErrorMessage>}
            {inputError && <ErrorMessage>Title required</ErrorMessage>}
        </div>

    );
};

const ErrorMessage = styled.p`
  color: red;
`
