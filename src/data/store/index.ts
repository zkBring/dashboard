import { createBrowserHistory } from 'history'
import { combineReducers, createStore, applyMiddleware } from 'redux';

import { userReducer } from './reducers/user/reducer';
import { contractReducer } from './reducers/contract/reducer'
import { newRetroDropReducer } from './reducers/campaign/reducer'
import { campaignsReducer } from './reducers/campaigns/reducer'

import { setProps, getLocalStore, setLocalStore } from './local-storage-redux'
import { UserState } from './reducers/user/types';
import { ContractState } from './reducers/contract/types';
import { CampaignState } from './reducers/campaign/types';
import { CampaignsState } from './reducers/campaigns/types';

export const history = createBrowserHistory()
setProps(['drops'])

export interface RootState {
  user: UserState,
  contract: ContractState,
  campaign: CampaignState,
  campaigns: CampaignsState
}

const store = createStore<RootState, any, any, any>(
  combineReducers({
    user: userReducer,
    contract: contractReducer,
    campaign: newRetroDropReducer,
    campaigns: campaignsReducer
  }),
  getLocalStore()
)

function init () {
  setLocalStore(store)
}
store.subscribe(init)
init()

export default store;