import styled, { css } from 'styled-components'
import { wrapperClassName } from './components/dashboard-key-popup/styled-components'

type TContentProps = { withBreadcrumbs: boolean };

export const Page = styled.div`
  height: 100%;
  display: flex;
  color: ${props => props.theme.primaryTextColor};

  .${wrapperClassName} {
    z-index: 101;
  }
`;

export const MainContent = styled.div`
  flex: 1;
  overflow: scroll;
  background: ${props => props.theme.blankColor};
`;

export const Content = styled.main<TContentProps>`
  padding: 24px 50px 24px;
  min-height: calc(100vh - 78px - 66px);
`
