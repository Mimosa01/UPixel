import styled, { css } from "styled-components";

interface PropsButton {
  $absolute?: boolean;
  $icon?: boolean;
}

export const Button = styled.button<PropsButton>`
  padding: ${props => props.$icon ? '5px' : '0'};
  color: #333;
  font-size: 1em;
  border: ${props => props.$icon ? '1px solid #b3b0b0' : 'none'};
  background-color: ${props => props.$icon ? '#fff' : 'transparent'};
  cursor: pointer;
  ${props => {
    if (props.$absolute) {
      return css`
        position: absolute;
        top: 1em;
        left: 1em;
      `
    }
  }}

  ${props => {
    if (props.$icon) {
      return css`
        border-radius: 10px;
        box-shadow: 3px 3px 0px 0px rgba(179, 176, 176, 0.5);
        & svg path {
          stroke: #333;
          stroke-width: 2;
        }
      `
    }
  }}
`

interface PropsPalleteColor {
  $color?: string;
}

export const PalleteColorButton = styled.button<PropsPalleteColor>`
  width: 60px;
  height: 60px;
  color: #fff;
  background-color: ${props => props.$color ? props.$color : '#fff'};
  border: 1px solid #b3b0b0;
  border-radius: 10px;
  box-shadow: 2px 2px 0px 0px rgba(179, 176, 176, 0.5);
  cursor: pointer;
  ${props => {
    if (props.$color) {
      return css`
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5em;
      `
    }
  }}
`