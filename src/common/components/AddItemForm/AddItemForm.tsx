import React, { ChangeEvent, useState } from "react"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Box from "@mui/material/Box"
import AddCircleIcon from "@mui/icons-material/AddCircle"

type Props = {
  addItem: (title: string) => void
  maxLength?: number
}

export const AddItemForm = ({ addItem, maxLength = 10 }: Props) => {
  const [title, setTitle] = useState("")
  const [inputError, setInputError] = useState<string | null>(null)

  const inputEmpty = !title
  const userErrorLengthMessage = title.length > maxLength
  // const userLengthMessage = `You have ${maxLength - title.length} characters left`

  const addItemOnClick = () => {
    const trimmedTitle = title.trim()
    if (!inputEmpty && !userErrorLengthMessage && trimmedTitle) {
      addItem(trimmedTitle)
    } else {
      setInputError("Title required")
    }
    setTitle("")
  }

  const onEnterClick = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      addItemOnClick()
    }
  }

  const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    inputError && setInputError(null)
    event.currentTarget.value.length > maxLength && setInputError(`Too long!!! (Max length: ${maxLength})`)
    setTitle(event.currentTarget.value)
  }

  const buttonStyle = {
    maxWidth: "75px",
    maxHeight: "39px",
    minWidth: "75px",
    minHeight: "39px",
  }

  return (
    <div>
      <Box display={"flex"} gap={"10px"}>
        <TextField
          label={inputError ? inputError : "Title"}
          variant="outlined"
          error={!!inputError}
          value={title}
          onChange={onChangeInputHandler}
          onKeyDown={onEnterClick}
          size="small"
        />
        <Button
          variant="contained"
          style={buttonStyle}
          onClick={addItemOnClick}
          endIcon={<AddCircleIcon />}
          disabled={inputEmpty || userErrorLengthMessage || !!inputError}
        >
          ADD
        </Button>
      </Box>
      {/*{inputEmpty && !inputError && <p>Max length title is {maxLength} charters</p>}*/}
      {/*{!inputEmpty && !userErrorLengthMessage && !inputError && <p>{userLengthMessage}</p>}*/}
    </div>
  )
}
