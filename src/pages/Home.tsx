import { gql, useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { faHand, faMoon, faSun } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { darkModeVar, disableDarkMode, enableDarkMode } from "../apollo";
import FixedExtension from "../extension/FixedExtension";
import {
  CustomExtensionContainer,
  FixExtensionContainer,
} from "../home/ExtensionBox";
import {
  Header,
  HeaderButtonContainer,
  HeaderContainer,
  HeaderText,
} from "../home/Header";
import HomeLayout from "../home/HomeLayout";

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
const CustomExtensionResult = styled.div`
  width: 500px;
  height: 250px;
  margin-top: 10px;
  border-radius: 10px;
  border: 1px solid;
`;

const Input = styled.input`
  margin: 5px;
  width: 300px;
`;

const Button = styled.button`
  margin-left: 10px;
`;

const UploadButton = styled.button`
  margin-right: 10px;
`;

const Separator = styled.div`
  margin: 20px 0px 30px 0px;
  width: 100%;
  height: 1px;
  background-color: black;
`;
const DarkModeBtn = styled.span`
  margin-right: 15px;
  cursor: pointer;
`;

const EXTENSIONS_QUERY = gql`
  query seeExtensions {
    seeExtensions {
      id
      title
      isCustom
      isActivated
    }
  }
`;

const TOGGLE_EXTENSION_MUTATION = gql`
  mutation toggleExtension($id: Int!) {
    toggleExtension(id: $id) {
      ok
      error
    }
  }
`;

const Home = () => {
  const darkMode = useReactiveVar(darkModeVar);
  const { data } = useQuery(EXTENSIONS_QUERY);
  const [toggleExtensionMutation] = useMutation(TOGGLE_EXTENSION_MUTATION);

  return (
    <HomeLayout>
      <div>
        <HeaderContainer>
          <FontAwesomeIcon icon={faHand} />
          <Header>
            <HeaderText>파일 확장자 차단</HeaderText>
            <HeaderButtonContainer>
              <DarkModeBtn
                onClick={darkMode ? disableDarkMode : enableDarkMode}
              >
                <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
              </DarkModeBtn>
              <UploadButton>upload</UploadButton>
            </HeaderButtonContainer>
          </Header>
        </HeaderContainer>
      </div>
      <Separator />
      <FixExtensionContainer>
        <div>
          <FixExtension>고정 확장자</FixExtension>
        </div>
        {data?.seeExtensions?.map((extension: any) => (
          <FixedExtension key={extension.id} {...extension} />
        ))}
      </FixExtensionContainer>
      <CustomExtensionContainer>
        <div>
          <CustomExtension>커스텀 확장자</CustomExtension>
        </div>
        <div>
          <form>
            <Input />
            <Button type="submit">추가</Button>
          </form>
          <CustomExtensionResult></CustomExtensionResult>
        </div>
      </CustomExtensionContainer>
    </HomeLayout>
  );
};

export default Home;