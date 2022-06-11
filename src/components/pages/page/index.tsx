import React, { FC } from 'react'
import { Header, Aside } from 'components/common'
import { Page, MainContent, Content } from './styled-components'
import { ThemeProvider } from 'styled-components'
import themes from 'themes'
import { TProps } from './types'

const PageComponent: FC<TProps> = ({ children }) => {
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
