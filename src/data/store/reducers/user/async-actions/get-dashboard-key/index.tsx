import { Dispatch } from 'redux'
import * as userActions from '../../actions'
import {
  UserActions,
} from '../../types'
import {
  CampaignActions
} from 'data/store/reducers/campaign/types'
import { RootState, IAppDispatch } from 'data/store'
import { dashboardKeyApi, plausibleApi } from 'data/api'
import { sleep, defineNetworkName, alertError } from 'helpers'
import retrieveDashboardKey from './retrieve-dashboard-key'
import createDashboardKey from './create-dashboard-key'
import {
  ERROR_DASHBOARD_KEY_REJECTED_CREATE,
  ERROR_DASHBOARD_KEY_REJECTED_RETRIEVE,
  defineError
} from './error-handling'

const getDashboardKey = () => {
  return async (
    dispatch: Dispatch<UserActions> & Dispatch<CampaignActions>  & IAppDispatch,
    getState: () => RootState
  ) => {
    const {
      user: {
        chainId,
        signer
      }
    } = getState()
    dispatch(userActions.setLoading(true))
    try {
      // dashboard key 
      const dashboardKeyData = await dashboardKeyApi.get()
      const { encrypted_key, sig_message, key_id } = dashboardKeyData.data
      if (!encrypted_key) {
        // register
        const result = await createDashboardKey(
          signer,
          sig_message
        )

        if (result) {
          const {
            dashboard_key,
            encrypted_dashboard_key
          } = result 
          if (encrypted_dashboard_key && dashboard_key) {
            const { data: { success } } = await dashboardKeyApi.create(
              encrypted_dashboard_key,
              key_id
            )
            if (success) {
              dispatch(userActions.setDashboardKey(dashboard_key))
            }
          }
        } else {
          throw new Error(ERROR_DASHBOARD_KEY_REJECTED_CREATE)
        }
      } else {
        const decrypted_dashboard_key = await retrieveDashboardKey(
          signer,
          encrypted_key,
          sig_message
        )
        if (decrypted_dashboard_key) {
          dispatch(userActions.setDashboardKey(decrypted_dashboard_key))
        } else {
          throw new Error(ERROR_DASHBOARD_KEY_REJECTED_RETRIEVE)
        }
      }

      plausibleApi.invokeEvent({
        eventName: 'sign_in_step3',
        data: {
          network: defineNetworkName(chainId),
          success: 'yes'
        }
      })
      await sleep(1000)
      dispatch(userActions.setAuthorizationStep('authorized'))
      dispatch(userActions.setLoading(false))
    } catch (err) {
      dispatch(userActions.setAuthorizationStep('login'))
      const errorText = defineError(err as Error)
      alertError(errorText)
      console.error({ err })
      plausibleApi.invokeEvent({
        eventName: 'sign_in_step3',
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





export default getDashboardKey
