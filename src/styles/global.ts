import { createGlobalStyle } from "styled-components";

export const GlobalStyled = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    position: relative;
    min-width: 375px;
    color: #333;
    font-family: 'pixel', sans-serif;
    font-size: 14px;
    line-height: 100%;
    background-color: #e5e5e5;
  }

  img {
    width: 100%;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  @media (min-width: 768px) {
    body {
      font-size: 16px;
    }
  }
`