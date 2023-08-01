import { createBrowserHistory } from 'history'
import { combineReducers, createStore, applyMiddleware, compose } from 'redux'

import { userReducer } from './reducers/user/reducer'
import { contractReducer } from './reducers/contract/reducer'
import { newRetroDropReducer } from './reducers/campaign/reducer'
import { campaignsReducer } from './reducers/campaigns/reducer'
import { qrsReducer } from './reducers/qrs/reducer'
import { dispensersReducer } from './reducers/dispensers/reducer'
import { collectionsReducer } from './reducers/collections/reducer'

import { UserState, UserActions } from './reducers/user/types'
import { ContractState, ContractActions } from './reducers/contract/types'
import { CampaignActions } from './reducers/campaign/types'
import { CampaignState,  } from './reducers/campaign/types'
import { CampaignsState, CampaignsActions } from './reducers/campaigns/types'
import { QRsState, QRsActions } from './reducers/qrs/types'
import { DispensersState, DispensersActions } from './reducers/dispensers/types'
import { CollectionsState, CollectionsActions } from './reducers/collections/types'

import thunkMiddleware, { ThunkDispatch, ThunkMiddleware } from "redux-thunk"

type TActions = CampaignActions &
                CampaignsActions &
                UserActions &
                ContractActions &
                QRsActions &
                DispensersActions &
                CollectionsActions

export const history = createBrowserHistory()

const reducers = combineReducers({
  user: userReducer,
  contract: contractReducer,
  campaign: newRetroDropReducer,
  campaigns: campaignsReducer,
  qrs: qrsReducer,
  dispensers: dispensersReducer,
  collections: collectionsReducer
})
type IAppState = ReturnType<typeof reducers>

export type IAppDispatch = ThunkDispatch<IAppState, any, TActions>

const composeEnhancers =
    process.env.NODE_ENV === "development"
        ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
        : compose;

export interface RootState {
  user: UserState,
  contract: ContractState,
  campaign: CampaignState,
  campaigns: CampaignsState,
  qrs: QRsState,
  dispensers: DispensersState,
  collections: CollectionsState
}

const store = createStore<RootState, any, any, any>(
  reducers,
  composeEnhancers(
    applyMiddleware<IAppDispatch, any>(
      thunkMiddleware as ThunkMiddleware<IAppState, TActions, any>,
    )
  ),
  
)

export default store;