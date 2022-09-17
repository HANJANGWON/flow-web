import { gql, useMutation, useQuery } from "@apollo/client";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { EXTENSIONS_QUERY } from "../pages/Home";

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

const DELETE_EXTENSION_MUTATION = gql`
  mutation deleteExtension($id: Int!) {
    deleteExtension(id: $id) {
      ok
    }
  }
`;

const CustomExtensionResult = styled.div`
  width: 500px;
  height: 250px;
  margin-top: 10px;
  border-radius: 10px;
  border: 1px solid;
  display: flex;
`;

const CustomExtension = styled.div`
  margin: 15px;
  span {
    margin-right: 3px;
  }
`;
const Input = styled.input`
  margin: 5px;
  width: 300px;
`;

const Button = styled.button`
  margin-left: 10px;
`;

const CustomExtensionFrom = () => {
  const { register, handleSubmit, setValue } = useForm();
  setValue("title", "");
  const { data } = useQuery(EXTENSIONS_QUERY);
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
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <Input
          {...register("title", { required: true })}
          name="title"
          type="text"
          placeholder="확장자를 입력해주세요..."
        />
        <Button type="submit">추가</Button>
      </form>
      <CustomExtensionResult>
        {data?.seeExtensions?.map((extension: any) =>
          extension.isCustom ? (
            <CustomExtension key={extension.id}>
              <span>{extension.title}</span>
              <FontAwesomeIcon
                style={{
                  color: "tomato",
                  cursor: "pointer",
                  marginLeft: "5px",
                }}
                icon={faTrashCan}
              />
            </CustomExtension>
          ) : null
        )}
      </CustomExtensionResult>
    </div>
  );
};

export default CustomExtensionFrom;
