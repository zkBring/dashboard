import { Dispatch } from 'redux'
import * as actionsCampaign from '../actions'
import * as actionsAsyncCampaigns from '../../campaigns/async-actions'
import { CampaignActions } from '../types'
import { TClaimPattern } from 'types'
import { IAppDispatch, RootState } from 'data/store'
import { plausibleApi } from 'data/api'
import { defineNetworkName } from 'helpers'

function applyClaimPattern(
  claimPattern: TClaimPattern,
  isNewCampaign: boolean,
  callback?: () => void
) {
  return async (
    dispatch: Dispatch<CampaignActions> & IAppDispatch,
    getState: () => RootState
  ) => {
    dispatch(actionsCampaign.setClaimPattern(claimPattern))
    const { user: { chainId }, campaign: { tokenStandard, id } } = getState()
    try {

      plausibleApi.invokeEvent({
        eventName: 'camp_step2_passed',
        data: {
          network: defineNetworkName(chainId),
          token_type: tokenStandard as string,
          claim_pattern: claimPattern
        }
      })
      
      // initial step passed
      isNewCampaign && dispatch(actionsAsyncCampaigns.addCampaignToDrafts(
        'approve'
      ))

      if (callback) {
        callback()
      }
    } catch (err) {
      console.error({ err })
    }
  }
}

export default applyClaimPattern
