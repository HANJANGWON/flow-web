import { createGlobalStyle, DefaultTheme } from "styled-components";

export const lightTheme: DefaultTheme = {
  bgColor: "#FAFAFA",
  fontColor: "rgb(38, 38, 38)",
};

export const darkTheme: DefaultTheme = {
  bgColor: "#2c2c2c",
  fontColor: "white",
};

export const GlobalStyles = createGlobalStyle`
    * {
      box-sizing: border-box;
    }
    body {
        font-size: 14px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
`;
