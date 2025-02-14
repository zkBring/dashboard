import { FC } from 'react'
import { Route, Switch, HashRouter } from 'react-router-dom'
import ProtectedRoute from './protected-route'

import {
  NotFound,
  Page,
  Campaigns,
  Campaign,
  CampaignsCreateInitial,
  CampaignsCreateAudience,
  CampaignsCreateLaunch,
  Main,
  CampaignsCreateNew,
  CampaignDispenserGenerate,
  ReclaimQR,
  ReclaimQRCreate,
  Reclaims,
  Support,
  About
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
          path='/campaigns/new'
          exact={true}
          loggedIn={Boolean(address)}
          // component={CampaignsCreateLaunch}
          component={CampaignsCreateNew}
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
          path='/campaigns/edit/:type/:id/new'
          exact={true}
          loggedIn={Boolean(address)}
          component={CampaignsCreateNew}
        />

        <ProtectedRoute
          path='/campaigns/:id'
          exact={true}
          loggedIn={Boolean(address)}
          component={Campaign}
        />

        <ProtectedRoute
          path='/campaigns/:id/dispenser/generate'
          exact={true}
          loggedIn={Boolean(address)}
          component={CampaignDispenserGenerate}
        />

        <ProtectedRoute
          path='/campaigns/new/:type/initial'
          exact={true}
          loggedIn={Boolean(address)}
          component={CampaignsCreateInitial}
        />

        <ProtectedRoute
          path='/campaigns/edit/:type/:id/initial'
          exact={true}
          loggedIn={Boolean(address)}
          component={CampaignsCreateInitial}
        />
        
        <ProtectedRoute
          path='/campaigns/new/:type/audience'
          exact={true}
          loggedIn={Boolean(address)}
          component={CampaignsCreateAudience}
        />

        <ProtectedRoute
          path='/campaigns/edit/:type/:id/audience'
          exact={true}
          loggedIn={Boolean(address)}
          component={CampaignsCreateAudience}
        />

        <ProtectedRoute
          path='/campaigns/new/:type/launch'
          exact={true}
          loggedIn={Boolean(address)}
          component={CampaignsCreateLaunch}
        />

        <ProtectedRoute
          path='/campaigns/edit/:type/:id/launch'
          exact={true}
          loggedIn={Boolean(address)}
          component={CampaignsCreateLaunch}
        />  

        <ProtectedRoute
          path='/campaigns/new/:type/generate'
          exact={true}
          loggedIn={Boolean(address)}
          component={CampaignsCreateLaunch}
        />

        <ProtectedRoute
          path='/campaigns/edit/:type/:id/generate'
          exact={true}
          loggedIn={Boolean(address)}
          component={CampaignsCreateLaunch}
        />

        <ProtectedRoute
          path='/reclaims/new'
          exact={true}
          loggedIn={Boolean(address)}
          component={ReclaimQRCreate}
        />

        <ProtectedRoute
          path='/reclaims/:id'
          exact={true}
          loggedIn={Boolean(address)}
          component={ReclaimQR}
        />

        <ProtectedRoute
          path='/reclaims'
          exact={true}
          loggedIn={Boolean(address)}
          component={Reclaims}
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
