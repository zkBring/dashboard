import { Dispatch } from 'redux'
import { CampaignActions } from '../../campaign/types'
import { UserActions } from '../../user/types'
import { RootState } from 'data/store'
import { CampaignsActions } from '../types'
import { campaignsApi } from 'data/api'
import * as actionsCampaigns from '../actions'
import {
  downloadLinksAsCSV,
  decryptLinks
} from 'helpers'
import { plausibleApi } from 'data/api'
import { defineNetworkName } from 'helpers'
const { REACT_APP_CLAIM_APP } = process.env

const downloadLinks = (
  batchId: string | number,
  campaignId: string,
  title: string,
  tokenAddress: string | null,
  encryptionKey?: string
) => {
  return async (
    dispatch: Dispatch<CampaignActions | UserActions | CampaignsActions>,
    getState: () => RootState
  ) => {

    let {
      user: { dashboardKey },
    } = getState()

    
    if (!dashboardKey) {
      if ( !encryptionKey) {
        return alert ('dashboardKey and encryptionKey are not provided')
      }
    }

    if (encryptionKey) {
      dashboardKey = encryptionKey
    }

    if (!REACT_APP_CLAIM_APP) { return alert ('REACT_APP_CLAIM_APP is not provided in .env') }
    if (!tokenAddress) { return alert ('tokenAddress is not provided') }
    try {
      dispatch(actionsCampaigns.setLoading(true))
      
      const result = await campaignsApi.getBatch(campaignId, batchId)

      if (result.data.success) {
        const { claim_links, batch } = result.data
        const decryptedLinks = decryptLinks({
          links: claim_links,
          dashboardKey: String(dashboardKey),
          tokenAddress
        })

        console.log({ batch })

        downloadLinksAsCSV(
          decryptedLinks,
          title,
          batch.created_at || ''
        )
        // await plausibleApi.invokeEvent({
        //   eventName: 'batch_added',
        //   data: {
        //     network: defineNetworkName(chainId),
        //     token_type: tokenStandard as string,
        //     claim_pattern: claimPattern,
        //     distribution: sdk ? 'sdk' : 'manual',
        //     sponsorship: sponsored ? 'sponsored' : 'non sponsored',
        //     extra_token: nativeTokensPerLink !== '0' ? 'yes' : 'no',
        //     preferred_wallet: wallet
        //   }
        // })
      }

      dispatch(actionsCampaigns.setLoading(false))
    } catch (err) {
      alert('Error occured! Check console for more info')
      console.error('Some error occured', err)
    }
  }
}

export default downloadLinks