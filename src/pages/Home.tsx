import { gql, useMutation, useQuery, useReactiveVar } from "@apollo/client";
import {
  faFolder,
  faFolderClosed,
  faHand,
  faMoon,
  faSun,
} from "@fortawesome/free-regular-svg-icons";
import { faFileArrowUp, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { darkModeVar, disableDarkMode, enableDarkMode } from "../apollo";
import CustomExtensionItem from "../extension/CustomExtension";

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
  cursor: pointer;
  border: none;
  color: ${(props) => props.theme.fontColor};
  background-color: ${(props) => props.theme.bgColor};
`;

const Separator = styled.div`
  margin: 20px 0px 30px 0px;
  width: 100%;
  height: 1px;

  background-color: ${(props) => props.theme.fontColor};
`;
const DarkModeBtn = styled.span`
  margin-right: 15px;
  cursor: pointer;
`;
const Input = styled.input`
  margin: 5px;
  width: 300px;
`;

const CustomExtensionResult = styled.div`
  width: 500px;
  height: 250px;
  margin-top: 10px;
  border-radius: 10px;
  border: 1px solid;
  display: flex;
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

const CREATE_EXTENSION_MUTATION = gql`
  mutation createExtension(
    $title: String!
    $isCustom: Boolean!
    $isActivated: Boolean!
  ) {
    createExtension(
      title: $title
      isCustom: $isCustom
      isActivated: $isActivated
    ) {
      id
      ok
      error
    }
  }
`;
const Home = () => {
  const darkMode = useReactiveVar(darkModeVar);
  const { data } = useQuery(EXTENSIONS_QUERY);
  const { register, handleSubmit, setValue } = useForm();
  setValue("title", "");
  const [createExtensionMutation] = useMutation(CREATE_EXTENSION_MUTATION);
  const onValid = (data: any) => {
    const { title } = data;
    createExtensionMutation({
      variables: {
        title,
        isCustom: true,
        isActivated: true,
      },
      refetchQueries: [{ query: EXTENSIONS_QUERY }],
    });
  };

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
              <FontAwesomeIcon
                style={{
                  cursor: "pointer",
                  marginRight: "10px",
                }}
                icon={faFileArrowUp}
              />
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
        <div>
          <form onSubmit={handleSubmit(onValid)}>
            <Input
              {...register("title", { required: true })}
              name="title"
              type="text"
              placeholder="확장자를 입력해주세요..."
            />
            <UploadButton type="submit">
              <FontAwesomeIcon size="lg" icon={faPlus} />
            </UploadButton>
          </form>
          <CustomExtensionResult>
            {data?.seeExtensions?.map((extension: any) =>
              extension.isCustom ? (
                <CustomExtensionItem key={extension.id} {...extension} />
              ) : null
            )}
          </CustomExtensionResult>
        </div>
      </CustomExtensionContainer>
    </HomeLayout>
  );
};

export default Home;
