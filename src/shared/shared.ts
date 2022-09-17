import styled from "styled-components";

export const BaseExtensionContainer = styled.div`
  width: 100%;

  display: flex;
  justify-content: flex-start;
`;
export const Separator = styled.div`
  margin: 20px 0px 30px 0px;
  width: 100%;
  height: 1px;

  background-color: ${(props) => props.theme.fontColor};
`;
