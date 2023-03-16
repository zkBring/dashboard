
import { Dispatch } from 'redux';
import * as actionsCampaign from '../actions';
import { CampaignActions } from '../types';
import { TAssetsData, TLinkContent } from 'types'
import { IAppDispatch } from 'data/store'

function setAssetsData(
  assets: TAssetsData,
  assetsOriginal: TLinkContent[],
  callback?: () => void
) {
  return async (
    dispatch: Dispatch<CampaignActions> & IAppDispatch
  ) => {
    dispatch(actionsCampaign.setAssets(assets))
    dispatch(actionsCampaign.setAssetsOriginal(assetsOriginal))
    try {
      if (callback) {
        callback()
      }
    } catch (err) {
      console.error({ err })
    }
  }
}

export default setAssetsData
