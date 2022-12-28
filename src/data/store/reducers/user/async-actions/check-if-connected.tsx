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

const checkIfConnected = () => {
  return async (
    dispatch: Dispatch<UserActions> & Dispatch<CampaignActions> & IAppDispatch,
  ) => {
    dispatch(userActions.setLoading(true))

    try {
      await sleep(1000)
      console.log({t: window.ethereum._state.accounts})
      if (window.ethereum._state.accounts.length > 0) {
        await userAsyncActions.connectWallet(dispatch)
      }
      return dispatch(userActions.setLoading(false))
    } catch (err) {
      console.log({
        err
      })
    }
    dispatch(campaignActions.setLoading(false))
  }
}

export default checkIfConnected
