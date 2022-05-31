import { createBrowserHistory } from 'history'
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';

import { userReducer } from './reducers/user/reducer';
import { contractReducer } from './reducers/contract/reducer'
import { newRetroDropReducer } from './reducers/campaign/reducer'
import { campaignsReducer } from './reducers/campaigns/reducer'
import { qrsReducer } from './reducers/qrs/reducer'

import { setProps, getLocalStore, setLocalStore } from './local-storage-redux'
import { UserState } from './reducers/user/types';
import { ContractState } from './reducers/contract/types';
import { CampaignState } from './reducers/campaign/types';
import { CampaignsState } from './reducers/campaigns/types';
import { QRsState } from './reducers/qrs/types';
import thunkMiddleware, { ThunkDispatch, ThunkMiddleware } from "redux-thunk";

import { CampaignActions } from './reducers/campaign/types'
import { CampaignsActions } from './reducers/campaigns/types'
import { UserActions } from './reducers/user/types'
import { ContractActions } from './reducers/contract/types'
import { QRsActions } from './reducers/qrs/types'

type TActions = CampaignActions & CampaignsActions & UserActions & ContractActions & QRsActions
export const history = createBrowserHistory()
setProps(['campaigns'])

const reducers = combineReducers({
  user: userReducer,
  contract: contractReducer,
  campaign: newRetroDropReducer,
  campaigns: campaignsReducer,
  qrs: qrsReducer
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
  qrs: QRsState
}

const store = createStore<RootState, any, any, any>(
  reducers,
  getLocalStore(),
  composeEnhancers(
    applyMiddleware<IAppDispatch, any>(
      thunkMiddleware as ThunkMiddleware<IAppState, TActions, any>,
    )
  ),
  
)

function init () {
  setLocalStore(store)
}
store.subscribe(init)
init()

export default store;