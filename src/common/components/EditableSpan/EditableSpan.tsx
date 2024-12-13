import React, { ChangeEvent, useState } from 'react'
import TextField from '@mui/material/TextField'

type Props = {
  value: string
  onChange: (title: string) => void
  maxLength?: number
  disabled?: boolean
}

export const EditableSpan = ({ value, onChange, disabled, maxLength = 110 }: Props) => {
  const [itemTitle, setItemTitle] = useState(value)
  const [editMode, setEditMode] = useState(false)
  const [inputError, setInputError] = useState(false)

  const inputEmpty = !itemTitle
  const userErrorLengthMessage = itemTitle.length > maxLength

  const changeTitle = () => {
    const trimmedTitle = itemTitle.trim()
    if (!inputEmpty && !userErrorLengthMessage && trimmedTitle) {
      onChange(trimmedTitle)
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

  const onDoubleClickHandler = () => {
    !disabled && setEditMode(true)
  }

  return editMode && !disabled ? (
    <TextField
      value={itemTitle}
      onChange={onChangeInputHandler}
      onKeyDown={onEnterClick}
      onBlur={onBlurHandler}
      className={inputError ? 'input-error' : undefined}
      autoFocus
      size={'small'}
    />
  ) : (
    <span onDoubleClick={onDoubleClickHandler}>{value}</span>
  )
}
