import React from 'react';
import styled, {css} from 'styled-components';
import {myTheme} from '../styles/Theme.styled';

type ButtonProps = {
    title: string,
    callBack: () => void,
    disabled?: boolean,
    activeButton?: boolean
}

export const Button = ({title, callBack, disabled, activeButton}: ButtonProps) => {

    const onClickButtonHandler = () => {
        callBack()
    }

    return (
        <StyledButton
            onClick={onClickButtonHandler}
            disabled={disabled}
            activeButton={activeButton}>
            {title}
        </StyledButton>
    );
};

const StyledButton = styled.button<{ disabled?: boolean; activeButton?: boolean }>`
  position: relative;
  display: inline-block;
  background-color: ${(props) =>
          props.activeButton ? myTheme.colors.lightOrange : props.disabled ? myTheme.colors.lightGrey : myTheme.colors.lightGreen};
  padding: 4px;
  border: ${myTheme.colors.borderColor} 1px solid;
  border-radius: 4px;
  z-index: 1;
  overflow: hidden;

  ${props => !props.disabled && css`
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      background-color: ${myTheme.colors.lightPurple};
      transition: transform 0.2s ease;
      transform: scaleX(0);
      transform-origin: left;
    }

    &:hover {
      &::before {
        transform: scaleX(1);
      }
    }
  `
  }
}
`
