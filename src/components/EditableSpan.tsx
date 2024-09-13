import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    value: string,
    updateTitle: (title: string) => void,
    classes?: string
    maxLength?: number
}

export const EditableSpan = ({value, updateTitle, classes, maxLength = 10}: EditableSpanPropsType) => {
    const [itemTitle, setItemTitle] = useState(value)
    const [editMode, setEditMode] = useState(false)
    const [inputError, setInputError] = useState(false)

    const inputEmpty = !itemTitle
    const userErrorLengthMessage = itemTitle.length > maxLength

    const rebuildTitle = () => {
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
            rebuildTitle()
        }
    }

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        inputError && setInputError(false)
        setItemTitle(event.currentTarget.value)
    }

    const onBlurHandler = () => {
        rebuildTitle()
    }

    return (
        editMode ? <input value={itemTitle}
                          onChange={onChangeInputHandler}
                          onKeyDown={onEnterClick}
                          onBlur={onBlurHandler}
                          className={inputError ? "input-error" : undefined}
                          autoFocus/>
            :
            <span className={classes} onDoubleClick={() => {setEditMode(true)}}>
                    {value}
            </span>
    );
};