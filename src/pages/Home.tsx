import { gql, useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { faHand, faMoon, faSun } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { darkModeVar, disableDarkMode, enableDarkMode } from "../apollo";
import CustomExtensionFrom from "../extension/CustomExtension";
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

const FixExtensionTitle = styled.div`
  width: 100px;
  margin: 10px;
`;

const CustomExtensionTitle = styled.div`
  width: 100px;
  margin: 10px;
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

export const EXTENSIONS_QUERY = gql`
  query seeExtensions {
    seeExtensions {
      id
      title
      isCustom
      isActivated
    }
  }
`;

const Home = () => {
  const darkMode = useReactiveVar(darkModeVar);
  const { data } = useQuery(EXTENSIONS_QUERY);

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
          <FixExtensionTitle>고정 확장자</FixExtensionTitle>
        </div>
        {data?.seeExtensions?.map((extension: any) => (
          <FixedExtension key={extension.id} {...extension} />
        ))}
      </FixExtensionContainer>
      <CustomExtensionContainer>
        <div>
          <CustomExtensionTitle>커스텀 확장자</CustomExtensionTitle>
        </div>
        <CustomExtensionFrom />
      </CustomExtensionContainer>
    </HomeLayout>
  );
};

export default Home;
