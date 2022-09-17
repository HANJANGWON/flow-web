import { gql, useMutation } from "@apollo/client";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styled from "styled-components";

const DELETE_EXTENSION_MUTATION = gql`
  mutation deleteExtension($id: Int!) {
    deleteExtension(id: $id) {
      ok
    }
  }
`;

const CustomExtension = styled.div`
  margin: 15px;
  span {
    margin-right: 3px;
  }
`;

const CustomExtensionItem = ({ id, title }: any) => {
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

export default CustomExtensionItem;
