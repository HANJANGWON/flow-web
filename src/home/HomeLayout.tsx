import styled from "styled-components";

type HomeLayoutProps = {
  children: React.ReactNode;
};

const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Wrapper = styled.div`
  max-width: 800px;
  width: 100%;
`;

const HomeLayout = ({ children }: HomeLayoutProps) => {
  return (
    <Container>
      <Wrapper>{children}</Wrapper>
    </Container>
  );
};

export default HomeLayout;
