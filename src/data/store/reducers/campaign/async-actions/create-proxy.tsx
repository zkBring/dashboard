
import { Dispatch } from 'redux';
import * as actionsCampaign from '../actions';
import { CampaignActions } from '../types';
import { UserActions } from '../../user/types'
import { RootState } from 'data/store'

const createProxyContract = () => {
  return async (
    dispatch: Dispatch<CampaignActions | UserActions>,
    getState: () => RootState
  ) => {
    const { user: { sdk }, campaigns: { campaigns } } = getState()
    const campaignId = String(campaigns.length)

    const proxyContractAddress = await sdk?.getProxyAddress(campaignId)
    if (!proxyContractAddress) { return }
    dispatch(actionsCampaign.setProxyContractAddress(proxyContractAddress))
    dispatch(actionsCampaign.setId(campaignId))
  }
}

export default createProxyContract