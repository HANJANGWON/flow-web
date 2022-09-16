import { gql, useMutation } from "@apollo/client";
import styled from "styled-components";

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

const TOGGLE_EXTENSION_MUTATION = gql`
  mutation toggleExtension($id: Int!) {
    toggleExtension(id: $id) {
      ok
      error
    }
  }
`;

const FixedExtension = ({ id, title, isActivated, isCustom }: any) => {
  const updateToggleExtension = (cache: any, result: any) => {
    const {
      data: {
        toggleExtension: { ok },
      },
    } = result;
    if (ok) {
      const extensionId = `LimitedExtension:${id}`;
      cache.modify({
        id: extensionId,
        fields: {
          isActivated(prev: boolean) {
            return !prev;
          },
        },
      });
    }
  };
  const [toggleExtensionMutation] = useMutation(TOGGLE_EXTENSION_MUTATION, {
    variables: {
      id,
    },
    update: updateToggleExtension,
  });
  return !isCustom ? (
    <ExtensionCheckBoxContainer>
      <ExtensionCheckBox key={id}>
        <input
          type={"checkbox"}
          onChange={() => {
            toggleExtensionMutation();
          }}
          checked={isActivated ? true : false}
        />
        <span>{title}</span>
      </ExtensionCheckBox>
    </ExtensionCheckBoxContainer>
  ) : null;
};

export default FixedExtension;
