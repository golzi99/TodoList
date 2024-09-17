import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    value: string,
    updateTitle: (title: string) => void,
    maxLength?: number
}

export const EditableSpan = ({value, updateTitle, maxLength = 10}: EditableSpanPropsType) => {
    const [itemTitle, setItemTitle] = useState(value)
    const [editMode, setEditMode] = useState(false)
    const [inputError, setInputError] = useState(false)

    const inputEmpty = !itemTitle
    const userErrorLengthMessage = itemTitle.length > maxLength

    const changeTitle = () => {
        const trimmedTitle = itemTitle.trim()
        if (!inputEmpty && !userErrorLengthMessage && trimmedTitle) {
            updateTitle(trimmedTitle)
            setEditMode(false)
        } else {
            setInputError(true)
        }
        setItemTitle(trimmedTitle)
    }

    const onEnterClick = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            changeTitle()
        }
    }

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        inputError && setInputError(false)
        setItemTitle(event.currentTarget.value)
    }

    const onBlurHandler = () => {
        changeTitle()
    }

    return (
        editMode ? <input value={itemTitle}
                          onChange={onChangeInputHandler}
                          onKeyDown={onEnterClick}
                          onBlur={onBlurHandler}
                          className={inputError ? "input-error" : undefined}
                          autoFocus/>
            :
            <span onDoubleClick={() => {setEditMode(true)}}>
                    {value}
            </span>
    );
};