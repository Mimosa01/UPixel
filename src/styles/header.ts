import { Link } from "react-router-dom";
import styled from "styled-components";

export const Header = styled.header`
  margin-bottom: 30px;
  padding: 15px 0;
  width: 100%;
  border-bottom: 1px solid #b3b0b0;
  border-radius: 0 0 10px 10px;
  background-color: white;
`

export const Logo = styled(Link)`
  & span {
    font-size: 1.75em;
    font-weight: 700;

    &:first-child {
      margin-right: 2px;
      color: red;
    }
  }
`

export const NavPointContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`

export const NavPoint = styled(Link)`
  width: 1.75em;
  height: 1.75em;
  border: 2px solid #b3b0b0;
  border-radius: 5px;

  @media (max-width: 576px) {
    width: 1.5em;
    height: 1.5em;
  }
`