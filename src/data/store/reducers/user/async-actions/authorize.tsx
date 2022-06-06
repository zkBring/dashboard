import { Dispatch } from 'redux'
import * as campaignActions from 'data/store/reducers/campaign/actions'
import {
  UserActions,
} from '../types'
import {
  CampaignActions
} from 'data/store/reducers/campaign/types'
import { RootState } from 'data/store'
import { authorizationApi } from 'data/api'

const authorize = (
  address: string
) => {
  return async (dispatch: Dispatch<UserActions>  & Dispatch<CampaignActions>, getState: () => RootState) => {
    const {
      user: {
        provider
      }
    } = getState()
    
    
    dispatch(campaignActions.setLoading(true))

    const timestamp = Date.now()
    const humanReadable = new Date(timestamp).toUTCString()
    
    try {
      const signer = await provider.getSigner()
      const message = `I'm signing this message to login to Linkdrop Dashboard at ${humanReadable}`
      const sig = await signer.signMessage(message)
      const authResponse = await authorizationApi.authorize(
        message,
        timestamp,
        sig,
        address.toLocaleUpperCase()
      )
      console.log({ authResponse })
      dispatch(campaignActions.setLoading(false))
      return message
    } catch (err) {
      console.error({ err })
      dispatch(campaignActions.setLoading(false))
      return null
    }
  }
}

export default authorize