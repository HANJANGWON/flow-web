import styled from "styled-components";
import { FixExtensionContainer } from "../home/ExtensionBox";

const FixExtension = styled.div`
  width: 100px;
  margin: 10px;
`;

const CustomExtension = styled.div`
  width: 100px;
  margin: 10px;
`;
const ExtensionCheckBoxContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;
const ExtensionCheckBox = styled.div`
  margin: 5px;
  display: flex;
  span {
    margin: 5px;
    width: 40px;
  }
`;

const FixedExtension = ({ id, title, isActivated }: any) => {
  return (
    <ExtensionCheckBoxContainer>
      <ExtensionCheckBox key={id}>
        <input type={"checkbox"} checked={isActivated ? true : false} />
        <span>{title}</span>
      </ExtensionCheckBox>
    </ExtensionCheckBoxContainer>
  );
};

export default FixedExtension;
