import { Dispatch } from 'redux';
import * as actionsCampaign from '../actions';
import { CampaignActions } from '../types';
import { TClaimPattern } from 'types'
import { IAppDispatch, RootState } from 'data/store'

function applyClaimPattern(
  claimPattern: TClaimPattern,
  callback?: () => void
) {
  return async (
    dispatch: Dispatch<CampaignActions> & IAppDispatch,
    getState: () => RootState
  ) => {
    dispatch(actionsCampaign.setClaimPattern(claimPattern))
    try {
      
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
