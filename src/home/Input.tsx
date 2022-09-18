import styled from "styled-components";

const Input = styled.input`
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.fontColor};
  border-radius: 3px;
  border: 1px solid;
  margin: 5px;
  width: 300px;
  padding: 7px;
  &::placeholder {
    color: ${(props) => props.theme.fontColor};
  }
`;

export default Input;
