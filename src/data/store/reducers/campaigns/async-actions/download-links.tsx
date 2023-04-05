import { Dispatch } from 'redux'
import { CampaignActions } from '../../campaign/types'
import { UserActions } from '../../user/types'
import { RootState } from 'data/store'
import { CampaignsActions } from '../types'
import { campaignsApi } from 'data/api'
import * as actionsCampaigns from '../actions'
import {
  downloadLinksAsCSV,
  decryptLinks,
  alertError
} from 'helpers'
import { TClaimPattern, TTokenType } from 'types'
import { plausibleApi } from 'data/api'
import { defineNetworkName } from 'helpers'

const { REACT_APP_CLAIM_APP } = process.env

const downloadLinks = (
  batchId: string | number,
  campaignId: string,
  title: string,
  tokenAddress: string | null,
  chainId: number,
  tokenType: TTokenType,
  sdk: boolean,
  sponsored: boolean,
  claimPattern: TClaimPattern,
  wallet: string,
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
        return alertError ('dashboardKey and encryptionKey are not provided')
      }
    }

    if (encryptionKey) {
      dashboardKey = encryptionKey
    }

    if (!REACT_APP_CLAIM_APP) { return alertError ('REACT_APP_CLAIM_APP is not provided in .env') }
    if (!tokenAddress) { return alertError ('tokenAddress is not provided') }
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
        plausibleApi.invokeEvent({
          eventName: 'download_links',
          data: {
            network: defineNetworkName(chainId),
            token_type: tokenType as string,
            claim_pattern: claimPattern,
            distribution: sdk ? 'sdk' : 'manual',
            sponsorship: sponsored ? 'sponsored' : 'non sponsored',
            preferred_wallet: wallet
          }
        })
      }

      dispatch(actionsCampaigns.setLoading(false))
    } catch (err) {
      alertError('Check console for more info')
      console.error('Some error occured', err)
    }
  }
}

export default downloadLinks