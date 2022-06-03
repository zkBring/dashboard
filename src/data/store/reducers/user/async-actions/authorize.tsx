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
    return '1'
    const {
      user: {
        provider
      }
    } = getState()
    
    
    dispatch(campaignActions.setLoading(true))
    try {
      const timeStamp = String(new Date())
      const signer = await provider.getSigner()
      const message = await signer.signMessage(`I’m signing this message to login to Linkdrop Dashboard at ${timeStamp}`)
      const authResponse = await authorizationApi.authorize(
        message,
        timeStamp,
        address
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