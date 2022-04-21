import React, { FC } from 'react'
// import { functionalActions } from 'decorators'
import { Header, Aside } from 'components/common'
import { Page, MainContent, Content } from './styled-components'
import { ThemeProvider } from 'styled-components'
import themes from 'themes'

interface PageProps {
  account?: string,
  chainId?: number
}

const PageComponent: FC<PageProps> = ({ children, account, chainId }) => {
  
  return (
    <ThemeProvider theme={themes.light}>
      <Page>
        <Aside />
        <MainContent>
          <Header />
          <Content>
            {children}
          </Content>
        </MainContent>
      </Page>
    </ThemeProvider>
  );
};

export default PageComponent;
