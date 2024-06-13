import { Dispatch } from 'redux'
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

const initialLoad = () => {
  return async (
    dispatch: Dispatch<UserActions> & Dispatch<CampaignActions> & IAppDispatch,
    getState: () => RootState
  ) => {
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
      // await sleep(1000)
      
      plausibleApi.invokeEvent({
        eventName: 'sign_in_show_connect'
      })
      dispatch(userActions.setAuthorizationStep('connect'))
    } catch (err) {
      console.log({
        err
      })
    }
    dispatch(userActions.setLoading(false))
  }
}

export default initialLoad
