import { FC } from 'react'
import { Route, Switch, HashRouter } from 'react-router-dom'
import ProtectedRoute from './protected-route'

import {
  NotFound,
  Page,
  Campaigns,
  CampaignsDetails,
  CampaignsCreateInitial,
  CampaignsCreateApprove,
  CampaignsCreateSecure,
  CampaignsCreateGenerate,
  QRs,
  QR,
  Main,
  CampaignsCreateNew,
  QRDownload,
  QRCreate,
  Dispensers,
  DispenserCreate,
  Dispenser
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
          component={CampaignsCreateNew}
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
          component={CampaignsDetails}
        />

        <ProtectedRoute
          path='/campaigns'
          exact={true}
          loggedIn={Boolean(address)}
          component={Campaigns}
        />

        <ProtectedRoute
          path='/dispensers'
          exact={true}
          loggedIn={Boolean(address)}
          component={Dispensers}
        />

        <ProtectedRoute
          path='/dispensers/new'
          exact={true}
          loggedIn={Boolean(address)}
          component={DispenserCreate}
        />

        <ProtectedRoute
          path='/dispensers/edit/:dispenserId'
          exact={true}
          loggedIn={Boolean(address)}
          component={DispenserCreate}
        />

        <ProtectedRoute
          path='/dispensers/:id'
          exact={true}
          loggedIn={Boolean(address)}
          component={Dispenser}
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
          path='/campaigns/new/:type/approve'
          exact={true}
          loggedIn={Boolean(address)}
          component={CampaignsCreateApprove}
        />

        <ProtectedRoute
          path='/campaigns/edit/:type/:id/approve'
          exact={true}
          loggedIn={Boolean(address)}
          component={CampaignsCreateApprove}
        />

        <ProtectedRoute
          path='/campaigns/new/:type/secure'
          exact={true}
          loggedIn={Boolean(address)}
          component={CampaignsCreateSecure}
        />

        <ProtectedRoute
          path='/campaigns/edit/:type/:id/secure'
          exact={true}
          loggedIn={Boolean(address)}
          component={CampaignsCreateSecure}
        />  

        <ProtectedRoute
          path='/campaigns/new/:type/generate'
          exact={true}
          loggedIn={Boolean(address)}
          component={CampaignsCreateGenerate}
        />

        <ProtectedRoute
          path='/campaigns/edit/:type/:id/generate'
          exact={true}
          loggedIn={Boolean(address)}
          component={CampaignsCreateGenerate}
        />

        <ProtectedRoute
          path='/qrs'
          exact={true}
          loggedIn={Boolean(address)}
          component={QRs}
        />

        <ProtectedRoute
          path='/qrs/new'
          exact={true}
          loggedIn={Boolean(address)}
          component={QRCreate}
        />

        <ProtectedRoute
          path='/qrs/:id'
          exact={true}
          loggedIn={Boolean(address)}
          component={QR}
        />

        <ProtectedRoute
          path='/qrs/:id/download'
          exact={true}
          loggedIn={Boolean(address)}
          component={QRDownload}
        />

        <Route path='/' exact={true}>
          <Main />
        </Route>

        <Route path='*' render={props => <NotFound
          {...props}
        />} />
      </Switch>
    </Page>
  </HashRouter>
}

export default connect(mapStateToProps)(AppRouter)

// /

// /campaings/
// /campaigns/new/:type/initial
// /campaigns/new/:type/approve (only erc20/erc721/erc1155)
// /campaigns/new/:type/secure

// /campaigns/:id
// /campaigns/:id/edit/initial
// /campaigns/:id/edit/approve
// /campaigns/:id/edit/secure
