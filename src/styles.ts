import { createGlobalStyle, DefaultTheme } from "styled-components";
import reset from "styled-reset";

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
        background-color: ${(props) => props.theme.bgColor};
        font-size: 14px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        color: ${(props) => props.theme.fontColor}
    }
`;
