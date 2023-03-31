import { Dispatch } from 'redux'
import * as userAsyncActions from 'data/store/reducers/user/async-actions'
import * as userActions from 'data/store/reducers/user/actions'
import { defineSystem } from 'helpers'

import {
  UserActions
} from '../types'
import {
  CampaignActions
} from 'data/store/reducers/campaign/types'
import { IAppDispatch } from 'data/store'
import { sleep } from 'helpers'
import { RootState } from 'data/store'
import { plausibleApi } from 'data/api'

const checkIfConnected = () => {
  return async (
    dispatch: Dispatch<UserActions> & Dispatch<CampaignActions> & IAppDispatch,
    getState: () => RootState
  ) => {
    const { user: { chainsAvailable } } = getState()
    dispatch(userActions.setLoading(true))
    const system = defineSystem()
    if (system !== 'desktop') {
      dispatch(userActions.setLoading(false))
      plausibleApi.invokeEvent({
        eventName: 'sign_in_not_desktop'
      })
      return dispatch(userActions.setAuthorizationStep('wrong_device'))
    }
    try {
      await sleep(1000)
      if (!window.ethereum || !window.ethereum._state) {
        dispatch(userActions.setLoading(false))
        plausibleApi.invokeEvent({
          eventName: 'sign_in_no_injected_wallet'
        })
        return dispatch(userActions.setAuthorizationStep('no_metamask'))
      }
      if (window.ethereum && window.ethereum._state && window.ethereum._state.accounts && window.ethereum._state.accounts.length > 0) {
        await userAsyncActions.connectWallet(dispatch, chainsAvailable)
      } else {
        plausibleApi.invokeEvent({
          eventName: 'sign_in_show_connect'
        })
        dispatch(userActions.setAuthorizationStep('connect'))
      }
    } catch (err) {
      console.log({
        err
      })
    }
    dispatch(userActions.setLoading(false))
  }
}

export default checkIfConnected
