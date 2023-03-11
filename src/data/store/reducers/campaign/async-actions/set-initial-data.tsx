
import { Dispatch } from 'redux';
import * as actionsCampaign from '../actions';
import { CampaignActions } from '../types';
import { TTokenType } from 'types'
import { IAppDispatch, RootState } from 'data/store'

function setInitialData(
  tokenStandard: TTokenType,
  title: string,
  callback?: () => void
) {
  return async (
    dispatch: Dispatch<CampaignActions> & IAppDispatch,
  ) => {
    dispatch(actionsCampaign.setTokenStandard(tokenStandard))
    dispatch(actionsCampaign.setTitle(title))
    if (callback) {
      callback()
    }
  }
}

export default setInitialData
