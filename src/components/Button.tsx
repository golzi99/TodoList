import React from 'react';
import styled from 'styled-components';
import {myTheme} from "../styles/Theme.styled";

type ButtonPropsType = {
    title: string
}

export const Button = ({title}: ButtonPropsType) => {
    return (
        <StyledButton>{title}</StyledButton>
    );
};

const StyledButton = styled.button`
  position: relative;
  background-color: ${myTheme.colors.lightGreen};
  padding: 4px;
  border: ${myTheme.colors.borderColor} 1px solid;
  border-radius: 4px;
  z-index: 1;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    border-radius: 4px;
    background-color: ${myTheme.colors.lightPurple};
    transition: transform 0.4s ease;
    transform: scaleX(0);
    transform-origin: left;
  }
  
  &:hover {
    &::before {
      transform: scaleX(1);
    }
  }
`
