import React from 'react';
import styled from 'styled-components';
import {myTheme} from '../styles/Theme.styled';
import {FilterValues} from '../types/types';

type ButtonProps = {
    title: string,
    onClick: (params?: any) => void;
    filterValue?: FilterValues,
    id?: number
}

export const Button = (props: ButtonProps) => {
    return (
        <StyledButton onClick={() => {
            if (props.filterValue) {
                props.onClick(props.filterValue)
            } else if (props.id) {
                props.onClick(props.id)
            }
            props.onClick()
        }}>
            {props.title}
        </StyledButton>
    );
};

const StyledButton = styled.button`
  position: relative;
  display: inline-block;
  background-color: ${myTheme.colors.lightGreen};
  padding: 4px;
  border: ${myTheme.colors.borderColor} 1px solid;
  border-radius: 4px;
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
