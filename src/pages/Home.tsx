import { gql, useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { faHand, faMoon, faSun } from "@fortawesome/free-regular-svg-icons";
import { faFileArrowUp, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { darkModeVar, disableDarkMode, enableDarkMode } from "../apollo";
import {
  CustomExtensionItem,
  CustomExtensionResult,
  CustomExtensionsNumber,
  CustomExtensionTitle,
} from "../extension/CustomExtension";
import { FixedExtension, FixExtensionTitle } from "../extension/FixedExtension";

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
import Input from "../home/Input";
import PageTitle from "../shared/PageTitle";
import { Separator } from "../shared/shared";

const UploadButton = styled.button`
  margin-right: 10px;
  cursor: pointer;
  border: none;
  color: ${(props) => props.theme.fontColor};
  background-color: ${(props) => props.theme.bgColor};
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
      customExtensionsNumber
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
  const instpectFile = (event: any) => {
    const fileName = event.target.files[0].name;
    const extension = fileName.substr(fileName.lastIndexOf(".") + 1);
    const limitedExtensions = data?.seeExtensions?.map((ext: any) =>
      ext.isActivated ? ext.title : null
    );
    if (limitedExtensions.includes(extension) === true) {
      alert("???????????? ?????? ???????????????.");
    }
  };

  return (
    <HomeLayout>
      <PageTitle title="?????? ????????? ??????" />
      <div>
        <HeaderContainer>
          <FontAwesomeIcon icon={faHand} />
          <Header>
            <HeaderText>?????? ????????? ??????</HeaderText>
            <HeaderButtonContainer>
              <DarkModeBtn
                onClick={darkMode ? disableDarkMode : enableDarkMode}
              >
                <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
              </DarkModeBtn>
              <label htmlFor="file">
                <FontAwesomeIcon
                  style={{
                    cursor: "pointer",
                    marginRight: "10px",
                  }}
                  icon={faFileArrowUp}
                />
                <Input
                  id="file"
                  type={"file"}
                  onChange={instpectFile}
                  style={{ display: "none" }}
                />
              </label>
            </HeaderButtonContainer>
          </Header>
        </HeaderContainer>
      </div>
      <Separator />
      <FixExtensionContainer>
        <div>
          <FixExtensionTitle>?????? ?????????</FixExtensionTitle>
        </div>
        {data?.seeExtensions?.map((extension: any) => (
          <FixedExtension key={extension.id} {...extension} />
        ))}
      </FixExtensionContainer>
      <CustomExtensionContainer>
        <div>
          <CustomExtensionTitle>????????? ?????????</CustomExtensionTitle>
        </div>
        <div>
          <form onSubmit={handleSubmit(onValid)}>
            <Input
              {...register("title", { required: true })}
              name="title"
              type="text"
              maxLength={20}
              placeholder="???????????? ????????? ?????????..."
            />
            <UploadButton type="submit">
              <FontAwesomeIcon size="lg" icon={faPlus} />
            </UploadButton>
          </form>
          <CustomExtensionResult>
            <CustomExtensionsNumber>
              {data?.seeExtensions[0]?.customExtensionsNumber}/200
            </CustomExtensionsNumber>
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
