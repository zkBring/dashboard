import { Dispatch } from 'redux'
import * as userActions from '../../actions'
import {
  UserActions,
} from '../../types'
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

const getDashboardKey = (
  message: string,
  key_id: string,
  is_coinbase: boolean,
  encrypted_key?: string
) => {
  // @ts-ignore
  return async (
    dispatch: Dispatch<UserActions> & IAppDispatch,
    getState: () => RootState
  ) => {
    const {
      user: {
        chainId,
        signer,
        address,
        provider
      }
    } = getState()
    dispatch(userActions.setLoading(true))
    try {
      // dashboard key 

      if (!encrypted_key) {
        // register
        const result = await createDashboardKey(
          provider,
          message,
          address,
          chainId as number,
          is_coinbase
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
          provider,
          encrypted_key,
          message,
          address,
          chainId as number,
          is_coinbase
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
