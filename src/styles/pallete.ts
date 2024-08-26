import styled from "styled-components";

export const PalleteStyled = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: #fff;
  border: 1px solid #b3b0b0;

  & ul {
    display: flex;
    gap: 15px;
    margin: 0;
    padding: 0;
    font-size: 1em;
    list-style: none;
    overflow-x: auto;
  }

  @media (orientation: landscape) {
    padding: 5px;
  }
`
