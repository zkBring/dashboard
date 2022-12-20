import React, { FC } from 'react'
import { Header, Aside, Breadcrumbs } from 'components/common'
import { Page, MainContent, Content } from './styled-components'
import { ThemeProvider } from 'styled-components'
import themes from 'themes'
import { TDefineTitle, TDefineBreadcrumbs, ILocationType } from './types'
import { useLocation } from 'react-router-dom'
import { RootState } from 'data/store'
import { connect } from 'react-redux'

const mapStateToProps = ({
  user: {
    authorizationStep
  }
}: RootState) => ({
  authorizationStep
})

const defineTitle: TDefineTitle = (location) => {
  const locationUpdated = location.toLowerCase()
  switch(true) {
    case locationUpdated.includes('/campaigns/new'):
    case locationUpdated.includes('/campaigns/new/initial'):
    case locationUpdated.includes('/campaigns/new/erc20/secure'):
    case locationUpdated.includes('/campaigns/new/erc20/generate'):
    case locationUpdated.includes('/campaigns/new/erc20/approve'):
    case locationUpdated.includes('/campaigns/new/erc721/secure'):
    case locationUpdated.includes('/campaigns/new/erc721/generate'):
    case locationUpdated.includes('/campaigns/new/erc721/approve'):
    case locationUpdated.includes('/campaigns/new/erc1155/secure'):
    case locationUpdated.includes('/campaigns/new/erc1155/generate'):
    case locationUpdated.includes('/campaigns/new/erc1155/approve'):
      return 'New Campaign'
    
    case locationUpdated.includes('/campaigns/edit/erc20'):
    case locationUpdated.includes('/campaigns/edit/erc721'):
    case locationUpdated.includes('/campaigns/edit/erc1155'):
      return 'New Batch'
    
      case locationUpdated.includes('/qrs/'):
      return "QR set manager"
    case locationUpdated.includes('/qrs'):
      return "QR manager"
    
    case locationUpdated.includes('/campaigns'):
      return 'Campaigns'
    default:
      return ''
  }
}

type ReduxType = ReturnType<typeof mapStateToProps>

const defineBreadcrumbs: TDefineBreadcrumbs = (location) => {
  const locationUpdated = location.toLowerCase()
  switch(true) {
    case locationUpdated.includes('/campaigns/new/erc20/initial'):
    case locationUpdated.includes('/campaigns/new/erc1155/initial'):
    case locationUpdated.includes('/campaigns/new/erc721/initial'):
    case locationUpdated.includes('/campaigns/edit/erc20') && locationUpdated.includes('/initial'):
    case locationUpdated.includes('/campaigns/edit/erc721') && locationUpdated.includes('/initial'):
    case locationUpdated.includes('/campaigns/edit/erc1155') && locationUpdated.includes('/initial'):
      return <Breadcrumbs
        items={
          [{
            title: 'Campaign setup',
            status: 'done'
          }, {
            title: 'Claim pattern',
            status: 'current'
          }, {
            title: 'Distribution'
          }, {
            title: 'Launch'
          }]
        }
      />

    case locationUpdated.includes('/campaigns/new/erc20/approve'):
    case locationUpdated.includes('/campaigns/new/erc721/approve'):
    case locationUpdated.includes('/campaigns/new/erc1155/approve'):
    case locationUpdated.includes('/campaigns/edit/erc20') && locationUpdated.includes('/approve'):
    case locationUpdated.includes('/campaigns/edit/erc721') && locationUpdated.includes('/approve'):
    case locationUpdated.includes('/campaigns/edit/erc1155') && locationUpdated.includes('/approve'):
      return <Breadcrumbs
        items={
          [{
            title: 'Campaign setup',
            status: 'done'
          }, {
            title: 'Claim pattern',
            status: 'done'
          }, {
            title: 'Distribution',
            status: 'current'
          }, {
            title: 'Launch'
          }]
        }
      />

    case locationUpdated.includes('/campaigns/new/erc20/secure'):
    case locationUpdated.includes('/campaigns/new/erc721/secure'):
    case locationUpdated.includes('/campaigns/new/erc1155/secure'):
    case locationUpdated.includes('/campaigns/edit/erc20') && locationUpdated.includes('/secure'):
    case locationUpdated.includes('/campaigns/edit/erc721') && locationUpdated.includes('/secure'):
    case locationUpdated.includes('/campaigns/edit/erc1155') && locationUpdated.includes('/secure'):
      return <Breadcrumbs
        items={
          [{
            title: 'Campaign setup',
            status: 'done'
          }, {
            title: 'Claim pattern',
            status: 'done'
          }, {
            title: 'Distribution',
            status: 'done'
          }, {
            title: 'Launch',
            status: 'current'
          }]
        }
      />
    case locationUpdated.includes('/campaigns/edit/erc20') && locationUpdated.includes('/new'):
    case locationUpdated.includes('/campaigns/edit/erc721') && locationUpdated.includes('/new'):
    case locationUpdated.includes('/campaigns/edit/erc1155') && locationUpdated.includes('/new'):
    case locationUpdated.includes('/campaigns/new'):
      return <Breadcrumbs
        items={
          [{
            title: 'Campaign setup',
            status: 'current'
          }, {
            title: 'Claim pattern'
          }, {
            title: 'Distribution'
          }, {
            title: 'Launch'
          }]
        }
      />
    default:
      return null
  }
}

const PageComponent: FC<ReduxType> = ({ children, authorizationStep }) => {
  
  const location = useLocation<ILocationType>()
  const title = defineTitle(location.pathname)
  const breadcrumbs = defineBreadcrumbs(location.pathname)
  const withHeader = authorizationStep === 'authorized'

  return (
    <ThemeProvider theme={themes.light}>
      <Page>
        <Aside />
        <MainContent>
          {withHeader && <Header
            title={title}
            breadcrumbs={breadcrumbs}
          />}
          <Content withBreadcrumbs={breadcrumbs}>
            {children}
          </Content>
        </MainContent>
      </Page>
    </ThemeProvider>
  )
}

export default connect(mapStateToProps)(PageComponent)
