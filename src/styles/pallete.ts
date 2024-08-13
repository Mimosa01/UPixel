import styled from "styled-components";

export const PalleteStyled = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  padding: 15px;
  height: 15vh;
  background-color: #fff;
  border: 1px solid #b3b0b0;
  box-shadow: 0px -3px 0px 0px rgba(179, 176, 176, 0.5);

  & ul {
    display: flex;
    gap: 15px;
    margin: 0;
    padding: 0;
    font-size: 1em;
    list-style: none;
    overflow-x: auto;
  }
`

export const ClearColor = styled.button`

`

// interface PropsPalleteColor {
//   $color: string;
// }

// export const PalleteColor = styled.li<PropsPalleteColor>`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 60px;
//   height: 60px;
//   color: #fff;
//   font-size: 1.5em;
//   background-color: ${props => props.$color };
//   border: none;
//   border-radius: 10px;
//   box-shadow: 2px 2px 0px 0px rgba(179, 176, 176, 0.5);
//   cursor: pointer;
// `