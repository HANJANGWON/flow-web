import { gql, useMutation } from "@apollo/client";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styled from "styled-components";

interface CustomExtensionItemProps {
  id: number;
  title: string;
}

const DELETE_EXTENSION_MUTATION = gql`
  mutation deleteExtension($id: Int!) {
    deleteExtension(id: $id) {
      ok
    }
  }
`;

export const CustomExtensionTitle = styled.div`
  width: 100px;
  margin: 10px;
`;

export const CustomExtensionResult = styled.div`
  width: 500px;
  height: 250px;
  margin-top: 10px;
  border-radius: 10px;
  border: 1px solid;
  display: flex;
`;

export const CustomExtensionsNumber = styled.div`
  margin: 8px 0px 0px 8px;
  font-size: 10px;
`;

const CustomExtension = styled.div`
  padding-top: 10px;
  margin: 15px;
  span {
    margin-right: 3px;
  }
`;

export const CustomExtensionItem = ({
  id,
  title,
}: CustomExtensionItemProps) => {
  const updateDeleteExtension = (cache: any, result: any) => {
    const {
      data: {
        deleteExtension: { ok },
      },
    } = result;
    if (ok) {
      cache.evict({ id: `LimitedExtension:${id}` });
      cache.modify({
        id: `LimitedExtension:${id}`,
        fields: {
          customExtensionsNumber(prev: any) {
            return prev - 1;
          },
        },
      });
    }
  };
  const [deleteExtensionMutation] = useMutation(DELETE_EXTENSION_MUTATION, {
    variables: { id },
    update: updateDeleteExtension,
  });
  const onDeleteClick = () => {
    deleteExtensionMutation();
  };
  return (
    <CustomExtension key={id}>
      <span>{title}</span>
      <FontAwesomeIcon
        style={{
          color: "tomato",
          cursor: "pointer",
          marginLeft: "5px",
        }}
        icon={faTrashCan}
        onClick={onDeleteClick}
      />
    </CustomExtension>
  );
};
