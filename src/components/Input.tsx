import React, {ChangeEvent} from 'react';
import styled, {css} from 'styled-components';

type InputProps = {
    title: string,
    setTitle: (title: string) => void,
    onEnter: () => void,
    error: boolean,
    setInputError: (error: boolean) => void
}

export const Input = ({title, setTitle, onEnter, error, setInputError}: InputProps) => {

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
        if (!event.currentTarget.value.trim() && event.currentTarget.value.length > 0) {
            setInputError(true)
        }
        else {
            setInputError(false)
        }
    }

    const onEnterClick = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onEnter()
        }
    }

    return (
        <StyledInput value={title}
                     onChange={onChangeInputHandler}
                     onKeyDown={onEnterClick}
                     error={error}
        />
    );
};

const StyledInput = styled.input<{ error: boolean }>`
  outline: none;
  
  ${props => props.error && css`
    border: red 1px solid;
  `}
`


