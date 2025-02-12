import { FC } from 'react'
import {
  Header,
  Breadcrumbs,
  Footer
} from 'components/common'
import { Page, MainContent, Content } from './styled-components'
import { ThemeProvider } from 'styled-components'
import themes from 'themes'
import {
  TDefineTitle,
  TDefineBreadcrumbs,
  ILocationType,
  TProps
} from './types'
import { useLocation } from 'react-router-dom'
import { RootState } from 'data/store'
import { connect } from 'react-redux'
import { DashboardKeyPopup } from './components'

const mapStateToProps = ({
  user: {
    authorizationStep,
    dashboardKeyPopup
  }
}: RootState) => ({
  authorizationStep,
  dashboardKeyPopup
})

const defineTitle: TDefineTitle = (location) => {
  const locationUpdated = location.toLowerCase()
  switch(true) {
    case locationUpdated.includes('/invite-links'):
      return 'Invite Links'

    case locationUpdated.includes('/collections'):
      return 'Soulbounds'

    case locationUpdated.includes('/campaigns/new'):
    case locationUpdated.includes('/campaigns/new/initial'):
    case locationUpdated.includes('/campaigns/new/erc20/launch'):
    case locationUpdated.includes('/campaigns/new/erc20/generate'):
    case locationUpdated.includes('/campaigns/new/erc20/audience'):
    case locationUpdated.includes('/campaigns/new/erc721/launch'):
    case locationUpdated.includes('/campaigns/new/erc721/generate'):
    case locationUpdated.includes('/campaigns/new/erc721/audience'):
    case locationUpdated.includes('/campaigns/new/erc1155/launch'):
    case locationUpdated.includes('/campaigns/new/erc1155/generate'):
    case locationUpdated.includes('/campaigns/new/erc1155/audience'):
      return 'New Campaign'
    
    case locationUpdated.includes('/campaigns/edit/erc20'):
    case locationUpdated.includes('/campaigns/edit/erc721'):
    case locationUpdated.includes('/campaigns/edit/erc1155'):
      return 'New Batch'
    
    case locationUpdated.includes('/reclaims'):
      return 'Reclaim Give-away'
    
    case locationUpdated.includes('/dispensers/new'):
      return "New Dispenser"

    case locationUpdated.includes('/campaigns'):
      return 'Claim Links'
    
    default:
      return ''
  }
}

type ReduxType = ReturnType<typeof mapStateToProps>

const defineBreadcrumbs: TDefineBreadcrumbs = (location) => {
  const locationUpdated = location.toLowerCase()
  switch(true) {

    case locationUpdated.includes('/campaigns/new/erc20/audience'):
    case locationUpdated.includes('/campaigns/edit/erc20') && locationUpdated.includes('/audience'):
      return <Breadcrumbs
        items={
          [{
            title: 'Campaign setup',
            status: 'done'
          }, {
            title: 'Distribution',
            status: 'current'
          }, {
            title: 'Launch'
          }]
        }
      />

    case locationUpdated.includes('/campaigns/new/erc20/launch'):
    case locationUpdated.includes('/campaigns/edit/erc20') && locationUpdated.includes('/launch'):
      return <Breadcrumbs
        items={
          [{
            title: 'Campaign setup',
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

    case locationUpdated.includes('/campaigns/edit/erc20') && locationUpdated.includes('/generate'):
      return null

    case locationUpdated.includes('/campaigns/edit/erc20') && locationUpdated.includes('/new'):
    case locationUpdated.includes('/campaigns/new'):
      return <Breadcrumbs
        items={
          [{
            title: 'Campaign setup',
            status: 'current'
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

const PageComponent: FC<ReduxType & TProps> = ({
  children,
  dashboardKeyPopup
}) => {  
  const location = useLocation<ILocationType>()
  const title = defineTitle(location.pathname)
  const breadcrumbs = defineBreadcrumbs(location.pathname)

  return (
    <ThemeProvider theme={themes.light}>
      <Page>
        <DashboardKeyPopup />
        <MainContent>
          <Header
            title={title}
            breadcrumbs={breadcrumbs}
          />
          <Content withBreadcrumbs={breadcrumbs}>
            {children}
          </Content>
          <Footer />
        </MainContent>
      </Page>
    </ThemeProvider>
  )
}

export default connect(mapStateToProps)(PageComponent)
