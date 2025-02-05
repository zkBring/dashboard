
import { Dispatch } from 'redux';
import * as actionsCampaign from '../actions';
import { CampaignActions } from '../types';
import { TAssetsData, TLinkContent } from 'types'
import { IAppDispatch } from 'data/store'

function setReclaimAudience(
  reclaimApp: string,
  reclaimInstagramId: string,
  callback?: () => void
) {
  return async (
    dispatch: Dispatch<CampaignActions> & IAppDispatch
  ) => {
    dispatch(actionsCampaign.setReclaimInstagramId(reclaimInstagramId))

    try {
      if (callback) {
        callback()
      }
    } catch (err) {
      console.error({ err })
    }
  }
}

export default setReclaimAudience
