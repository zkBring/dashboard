
import { Dispatch } from 'redux';
import * as actionsCampaign from '../actions';
import { CampaignActions } from '../types';
import { TAssetsData, TLinkContent } from 'types'
import { IAppDispatch } from 'data/store'

function launch (
  callback?: () => void
) {
  return async (
    dispatch: Dispatch<CampaignActions> & IAppDispatch,
    getState: () => RootState
  ) => {
    dispatch(actionsCampaign.setReclaimInstagramId(''))

    try {
      if (callback) {
        callback()
      }
    } catch (err) {
      console.error({ err })
    }
  }
}

export default launch
