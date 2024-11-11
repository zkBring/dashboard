
import { Dispatch } from 'redux'
import * as actionsCampaign from '../actions'
import { CampaignActions } from '../types'
import { UserActions } from '../../user/types'
import { RootState } from 'data/store'
import { alertError } from 'helpers'
import createProxyAddress from './create-proxy-address'

const resetCampaign = (id?: string) => {
  return async (
    dispatch: Dispatch<CampaignActions | UserActions>,
    getState: () => RootState
  ) => {
    const { user: { sdk, address, chainId }, campaigns: { campaigns } } = getState()
    if (!chainId) {
      return alertError('No chain id provided')
    }

    dispatch(actionsCampaign.clearCampaign())
    if (id) {
      const campaign = campaigns.find(campaign => campaign.campaign_number === id)
      if (campaign) {
        const { proxy_contract_address } = campaign
        dispatch(actionsCampaign.setProxyContractAddress(proxy_contract_address))
        dispatch(actionsCampaign.setId(id))
        return
      }
    }
    await createProxyAddress(
      dispatch,
      chainId,
      sdk,
      address
    )
    
  }
}

export default resetCampaign