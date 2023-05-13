import { Dispatch } from 'redux'
import { CampaignActions } from '../../campaign/types'
import { UserActions } from '../../user/types'
import { RootState } from 'data/store'
import { CampaignsActions } from '../types'
import { campaignsApi } from 'data/api'
import * as actionsCampaigns from '../actions'
import {
  downloadLinksAsCSV,
  alertError,
  defineNetworkName
} from 'helpers'
import { plausibleApi } from 'data/api'

const downloadReport = (
  campaignId: string
) => {
  return async (
    dispatch: Dispatch<CampaignActions | UserActions | CampaignsActions>,
    getState: () => RootState
  ) => {
    const { user: { chainId } } = getState()
    if (!campaignId) { return alertError ('campaignId is not provided') }
    try {
    
      const { data: { links_data } } = await campaignsApi.getReport(campaignId)
      if (links_data.length === 0) {
        alertError('No data for report. At least one claimed link is needed for report')
        return dispatch(actionsCampaigns.setLoading(false))
      }
      downloadLinksAsCSV(links_data, `REPORT-${campaignId}`)
      plausibleApi.invokeEvent({
        eventName: 'download_report',
        data: {
          network: defineNetworkName(chainId),
          campaignId
        }
      })
      dispatch(actionsCampaigns.setLoading(false))
    } catch (err) {
      alertError('Check console for more info')
      console.error('Some error occured', err)
    }
  }
}

export default downloadReport