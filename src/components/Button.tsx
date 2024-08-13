import React from 'react';
import styled from 'styled-components';
import {myTheme} from "../styles/Theme.styled";

type ButtonProps = {
    title: string
}

export const Button = ({title}: ButtonProps) => {
    return (
        <StyledButton>{title}</StyledButton>
    );
};

const StyledButton = styled.button`
  position: relative;
  display: inline-block;
  background-color: ${myTheme.colors.lightGreen};
  padding: 4px;
  border: ${myTheme.colors.borderColor} 1px solid;
  border-radius: 16px;
  z-index: 1;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
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
