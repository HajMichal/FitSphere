import styled from "styled-components";

export const PageContainer = styled.div`
  padding-bottom: 20px;
  height: calc(100dvh - 67px);
  overflow-y: auto;
  background-color: ${(props) => props.theme.background};
  font-family: "Montserrat";
`;

export const CenterContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
