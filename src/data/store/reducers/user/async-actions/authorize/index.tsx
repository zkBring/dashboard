import { Dispatch } from 'redux'
import * as userActions from '../../actions'
import {
  UserActions,
} from '../../types'
import {
  CampaignActions
} from 'data/store/reducers/campaign/types'
import { RootState, IAppDispatch } from 'data/store'
import { authorizationApi, plausibleApi } from 'data/api'
import { defineNetworkName, alertError } from 'helpers'
import {
  initialization,
  getDashboardKey
} from '../index'
import {
  ERROR_DASHBOARD_AUTH_REJECTED,
  defineError
} from './error-handling'

const authorize = () => {
  return async (
    dispatch: Dispatch<UserActions> & Dispatch<CampaignActions>  & IAppDispatch,
    getState: () => RootState
  ) => {
    const {
      user: {
        address,
        chainId,
        signer
      }
    } = getState()
    dispatch(userActions.setLoading(true))

    const timestamp = Date.now()
    const humanReadable = new Date(timestamp).toUTCString()
    
    try {
      const message = `I'm signing this message to login to Linkdrop Dashboard at ${humanReadable}`
      
      try {
        const sig = await signer.signMessage(message)
        await authorizationApi.authorize(
          message,
          timestamp,
          sig,
          address.toLocaleUpperCase()
        )
      } catch (err) {
        plausibleApi.invokeEvent({
          eventName: 'sign_in_signature_reject',
          data: {
            signature: 'login'
          }
        })
        throw new Error(ERROR_DASHBOARD_AUTH_REJECTED)
      }
      
      dispatch(userActions.setAuthorizationStep('store-key'))
      dispatch(initialization())

      plausibleApi.invokeEvent({
        eventName: 'sign_in_step2',
        data: {
          network: defineNetworkName(chainId),
          success: 'yes',
        }
      })

      dispatch(getDashboardKey())

    } catch (err) {
      dispatch(userActions.setAuthorizationStep('login'))
      const errorText = defineError(err as Error)
      alertError(errorText)
      console.error({ err })
      plausibleApi.invokeEvent({
        eventName: 'sign_in_step2',
        data: {
          network: defineNetworkName(chainId),
          success: 'no',
          errorText
        }
      })
      dispatch(userActions.setLoading(false))
    }
  }
}

export default authorize
