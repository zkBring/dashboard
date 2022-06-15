
import { Dispatch } from 'redux';
import * as actionsCampaign from '../actions';
import { CampaignActions } from '../types';
import { TTokenType } from 'types'

async function setAssetsData(
  dispatch: Dispatch<CampaignActions>,
  tokenStandard: TTokenType,
  assets: any,
  wallet: string,
  title: string,
  callback?: () => void
) {
  dispatch(actionsCampaign.setAssets(assets))
  dispatch(actionsCampaign.setTokenStandard(tokenStandard))
  dispatch(actionsCampaign.setWallet(wallet))
  dispatch(actionsCampaign.setTitle(title))
  
  if (callback) {
    callback()
  }
}

export default setAssetsData
