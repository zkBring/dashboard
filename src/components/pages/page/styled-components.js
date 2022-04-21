import styled from 'styled-components';

export const Page = styled.div`
  height: 100%;
  display: flex;
`;

export const MainContent = styled.div`
  flex: 1;
  background: ${props => props.theme.blankColor};
`;

export const Content = styled.main`
  padding: 24px 20px 24px;
  min-height: calc(100vh - 68px - 58px);
`
