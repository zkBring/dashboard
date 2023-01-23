import Web3Modal from "web3modal"
import { Dispatch } from 'redux'
import * as campaignActions from 'data/store/reducers/campaign/actions'
import * as userAsyncActions from 'data/store/reducers/user/async-actions'
import * as userActions from 'data/store/reducers/user/actions'

import {
  UserActions
} from '../types'
import {
  CampaignActions
} from 'data/store/reducers/campaign/types'
import { IAppDispatch } from 'data/store'
import { sleep } from 'helpers'
import { RootState } from 'data/store'

const checkIfConnected = () => {
  return async (
    dispatch: Dispatch<UserActions> & Dispatch<CampaignActions> & IAppDispatch,
    getState: () => RootState
  ) => {
    const { user: { chainsAvailable } } = getState()
    try {
      await sleep(1000)
      if (window.ethereum && window.ethereum._state && window.ethereum._state.accounts && window.ethereum._state.accounts.length > 0) {
        await userAsyncActions.connectWallet(dispatch, chainsAvailable)
      } else {
        dispatch(userActions.setAuthorizationStep('connect'))
      }
    } catch (err) {
      console.log({
        err
      })
    }
  }
}

export default checkIfConnected
