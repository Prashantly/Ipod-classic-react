import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

body{
  margin:0;
  padding:0;
  height: 100%;
  width: 100%;
//   background-color: #4776E6;
//   background-image: linear-gradient(to left, #4776E6, #8E54E9);
  font-family: 'Montserrat', sans-serif;
  color: #fff;
}

h2,
p {
  margin: 0;
  padding: 0;
}

ul {
    margin: 0;
    list-style: none;
  }
`;
