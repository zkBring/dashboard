import React, { useEffect, FC } from 'react'
import { Route, Switch, HashRouter } from 'react-router-dom'
// import { functionalActions } from 'decorators'
import ProtectedRoute from './protected-route'


import {
  NotFound,
  Page,
  Campaigns,
  CampaignsCreate,
  CampaignsDetails,
  Main,
  CampaignsCreateInitial,
  CampaignsCreateApprove
//   NotFound,
//   ProtectedRoute,
//   Authorize
} from 'components/pages'

import { Dispatch } from 'redux';
import * as asyncActions from 'data/store/reducers/user/async-actions'
import { UserActions } from 'data/store/reducers/user/types'
import { connect } from 'react-redux';
import { RootState } from 'data/store';
import communities from 'configs/communities'


const mapDispatcherToProps = (dispatch: Dispatch<UserActions> ) => {
  return {
    connectWallet: () => asyncActions.connectWallet(dispatch),
  }
}

const mapStateToProps = ({ user: { provider, address } }: RootState) => ({ provider, address })
type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

const AppRouter: FC<ReduxType> = ({ address, connectWallet }) => {

  return <HashRouter>
    <Page>
      <Switch>

        <ProtectedRoute
          path='/campaigns/new'
          exact={true}
          loggedIn={Boolean(address)}
          component={CampaignsCreate}
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
          path='/campaigns/new/:type/initial'
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

        <Route path='/' exact={true} render={props => <Main {...props} />} />
        <Route path='*' exact={true} render={props => <NotFound
          {...props}
        />} />
      </Switch>
    </Page>
  </HashRouter>
}

export default connect(mapStateToProps, mapDispatcherToProps)(AppRouter)

// /

// /campaings/
// /campaigns/new/:type/initial
// /campaigns/new/:type/approve (only erc20/erc721/erc1155)
// /campaigns/new/:type/secure

// /campaigns/:id
// /campaigns/:id/edit/initial
// /campaigns/:id/edit/approve
// /campaigns/:id/edit/secure
