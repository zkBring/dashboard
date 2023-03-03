
import { Dispatch } from 'redux';
import * as actionsCampaign from '../actions';
import { CampaignActions } from '../types';
import { UserActions } from '../../user/types'
import { RootState } from 'data/store'
import contracts from 'configs/contracts'

const createProxyContract = (id?: string) => {
  return async (
    dispatch: Dispatch<CampaignActions | UserActions>,
    getState: () => RootState
  ) => {
    const { user: { sdk, address, chainId }, campaigns: { campaigns } } = getState()
    if (!chainId) {
      return alert('No chain id provided')
    }
    if (id) {
      const campaign = campaigns.find(campaign => campaign.campaign_number === id)
      if (campaign) {
        const { proxy_contract_address } = campaign
        dispatch(actionsCampaign.setProxyContractAddress(proxy_contract_address))
        dispatch(actionsCampaign.setId(id))
        return
      }
    }
    const contract = contracts[chainId]
    const campaignId = String(+(new Date()))
    const proxyContractAddress = await sdk?.utils.computeProxyAddress(
      contract.factory,
      address,
      campaignId
    )
    console.log({ proxyContractAddress })
    if (!proxyContractAddress) { return }
    dispatch(actionsCampaign.setProxyContractAddress(proxyContractAddress))
    dispatch(actionsCampaign.setId(campaignId))
  }
}

export default createProxyContract