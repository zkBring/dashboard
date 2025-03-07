import { FC } from 'react'
import { Route, Switch, HashRouter } from 'react-router-dom'
import ProtectedRoute from './protected-route'

import {
  NotFound,
  Page,
  Campaigns,
  Campaign,
  CampaignsCreateTokenData,
  CampaignsCreateAudience,
  CampaignsCreateLaunch,
  Main,
  CampaignsCreateCampaignData,
  Support,
  About,
  CampaignsCreateTransactions
} from 'components/pages'
import { connect } from 'react-redux'
import { RootState } from 'data/store'

const mapStateToProps = ({ user: { provider, address } }: RootState) => ({ provider, address })
type ReduxType = ReturnType<typeof mapStateToProps>

const AppRouter: FC<ReduxType> = ({ address }) => {
  return <HashRouter>
    <Page>
      <Switch>

        <ProtectedRoute
          path='/campaigns/new/:type/audience'
          exact={true}
          loggedIn={Boolean(address)}
          component={CampaignsCreateAudience}
        />

        <ProtectedRoute
          path='/campaigns/new/:type/token-data'
          exact={true}
          loggedIn={Boolean(address)}
          component={CampaignsCreateTokenData}
        />

        <ProtectedRoute
          path='/campaigns/new/:type/campaign-data'
          exact={true}
          loggedIn={Boolean(address)}
          // component={CampaignsCreateLaunch}
          component={CampaignsCreateCampaignData}
        />

        <ProtectedRoute
          path='/campaigns/new/:type/transactions'
          exact={true}
          loggedIn={Boolean(address)}
          // component={CampaignsCreateLaunch}
          component={CampaignsCreateTransactions}
        />

        <ProtectedRoute
          path='/campaigns/new/:type/launch'
          exact={true}
          loggedIn={Boolean(address)}
          component={CampaignsCreateLaunch}
        />



        <Route
          path='/support'
          exact={true}
          // component={CampaignsCreateLaunch}
          component={Support}
        />

        <Route
          path='/about'
          exact={true}
          // component={CampaignsCreateLaunch}
          component={About}
        />

        <ProtectedRoute
          path='/campaigns/:id'
          exact={true}
          loggedIn={Boolean(address)}
          component={Campaign}
        />

        <ProtectedRoute
          path='/campaigns'
          exact={true}
          loggedIn={Boolean(address)}
          component={Campaigns}
        />

        <Route path='/' exact={true}>
          <Main />
        </Route>

        <Route path='*'>
          <NotFound />
        </Route>
      </Switch>
    </Page>
  </HashRouter>
}

export default connect(mapStateToProps)(AppRouter)
