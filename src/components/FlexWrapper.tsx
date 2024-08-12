import styled from 'styled-components';

export type FlexWrapperPropsType = {
    direction?: string
    justify?: string
    align?: string
    wrap?: string
    flex?: string
    gap?: string
}

export const FlexWrapper = styled.div<FlexWrapperPropsType>`
  display: flex;
  flex-direction: ${props => props.direction || "row"};
  justify-content: ${props => props.justify || "flex-start"};
  align-items: ${props => props.align || "stretch"};
  flex-wrap: ${props => props.wrap || "nowrap"};
  height: 100%;
  gap: ${props => props.gap || "0"}
`