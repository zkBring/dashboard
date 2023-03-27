import { Dispatch } from 'redux';
import * as actionsCampaign from '../actions';
import { CampaignActions } from '../types';
import { TClaimPattern } from 'types'
import { IAppDispatch, RootState } from 'data/store'
import { plausibleApi } from 'data/api'
import { defineNetworkName } from 'helpers'

function applyClaimPattern(
  claimPattern: TClaimPattern,
  callback?: () => void
) {
  return async (
    dispatch: Dispatch<CampaignActions> & IAppDispatch,
    getState: () => RootState
  ) => {
    dispatch(actionsCampaign.setClaimPattern(claimPattern))
    const { user: { chainId }, campaign: { tokenStandard } } = getState()
    try {

      await plausibleApi.invokeEvent({
        eventName: 'camp_step2_passed',
        data: {
          network: defineNetworkName(chainId),
          token_type: tokenStandard as string,
          claim_pattern: claimPattern
        }
      })
      
      if (callback) {
        callback()
      }
    } catch (err) {
      console.error({ err })
      // dispatch(actionsCampaign.setSymbol('ERC1155'))
      // if (callback) {
      //   callback()
      // }
    }
  }
}

export default applyClaimPattern
