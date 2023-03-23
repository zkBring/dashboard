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

        console.log({ claim_links })
    
        const decryptedLinks = decryptLinks({
          links: claim_links,
          dashboardKey: String(dashboardKey),
          tokenAddress
        })
        downloadLinksAsCSV(
          decryptedLinks,
          title,
          batch.created_at || ''
        )
      }

      dispatch(actionsCampaigns.setLoading(false))
    } catch (err) {
      alert('Error occured! Check console for more info')
      console.error('Some error occured', err)
    }
  }
}

export default downloadLinks