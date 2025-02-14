import { createBrowserHistory } from 'history'
import { combineReducers, createStore, applyMiddleware, compose } from 'redux'

import { userReducer } from './reducers/user/reducer'
import { newRetroDropReducer } from './reducers/campaign/reducer'
import { campaignsReducer } from './reducers/campaigns/reducer'
import { dispensersReducer } from './reducers/dispensers/reducer'

import { UserState, UserActions } from './reducers/user/types'
import { CampaignActions, CampaignState } from './reducers/campaign/types'
import { CampaignsState, CampaignsActions } from './reducers/campaigns/types'
import { DispensersState, DispensersActions } from './reducers/dispensers/types'

import thunkMiddleware, { ThunkDispatch, ThunkMiddleware } from "redux-thunk"

// @ts-ignore
type TActions = CampaignActions &
                CampaignsActions &
                UserActions &
                DispensersActions

export const history = createBrowserHistory()

const reducers = combineReducers({
  user: userReducer,
  campaign: newRetroDropReducer,
  campaigns: campaignsReducer,
  dispensers: dispensersReducer
})
type IAppState = ReturnType<typeof reducers>

export type IAppDispatch = ThunkDispatch<IAppState, any, TActions>

const composeEnhancers =
    process.env.NODE_ENV === "development"
        ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
        : compose;

export interface RootState {
  user: UserState,
  campaign: CampaignState,
  campaigns: CampaignsState,
  dispensers: DispensersState
}

const store = createStore<RootState, any, any, any>(
  reducers,
  composeEnhancers(
    applyMiddleware<IAppDispatch, any>(
      // @ts-ignore
      thunkMiddleware as ThunkMiddleware<IAppState, TActions, any>,
    )
  ),
  
)

export default store;