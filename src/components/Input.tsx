import React, {ChangeEvent} from 'react';
import styled, {css} from 'styled-components';

type InputProps = {
    value: string,
    setValue: (title: string) => void,
    onEnter: () => void,
    error: boolean,
    setInputError: (error: boolean) => void,
    autoFocus?: boolean,
    onBlur?: () => void
}

export const Input = ({value, setValue, onEnter, error, setInputError, autoFocus, onBlur}: InputProps) => {

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        error && setInputError(false)
        setValue(event.currentTarget.value)
    }

    const onEnterClick = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onEnter()
        }
    }

    const handleBlur = () => {
        if (typeof onBlur === 'function') {
            onBlur();
        }
    };

    return (
        <StyledInput value={value}
                     onChange={onChangeInputHandler}
                     onKeyDown={onEnterClick}
                     error={error}
                     autoFocus={autoFocus}
                     onBlur={handleBlur}
        />
    );
};

const StyledInput = styled.input<{ error: boolean }>`
  outline: none;
  
  ${props => props.error && css`
    border: red 1px solid;
  `}
`


