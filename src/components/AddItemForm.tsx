import React, {ChangeEvent, useState} from 'react';
import {Button} from './Button';

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

    const onEnterClick = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addItemOnClick()
        }
    }

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        inputError && setInputError(false)
        setTitle(event.currentTarget.value)
    }

    return (
        <div>
            <div>
                <input className={inputError ? "input-error" : undefined} value={title} onChange={onChangeInputHandler} onKeyDown={onEnterClick}/>
                <Button title={'+'} callBack={addItemOnClick}
                        disabled={inputEmpty || userErrorLengthMessage || inputError}/>
            </div>
            {inputEmpty && !inputError && <p>Max length title is {maxLength} charters</p>}
            {!inputEmpty && !userErrorLengthMessage && !inputError && <p>{userLengthMessage}</p>}
            {userErrorLengthMessage && !inputError && <p className={'error-message'}>Title is to long</p>}
            {inputError && <p className={'error-message'}>Title required</p>}
        </div>

    );
};
