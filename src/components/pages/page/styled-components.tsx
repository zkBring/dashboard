import styled, { css } from 'styled-components'

type TContentProps = { withBreadcrumbs: boolean };

export const Page = styled.div`
  height: 100%;
  display: flex;
`;

export const MainContent = styled.div`
  flex: 1;
  background: ${props => props.theme.blankColor};
`;

export const Content = styled.main<TContentProps>`
  padding: 24px 20px 24px;
  height: 100%;
  overflow: scroll;
  max-height: calc(100vh - 80px);
  ${props => props.withBreadcrumbs && css`
    max-height: calc(100vh - 116px);
  `}
`
