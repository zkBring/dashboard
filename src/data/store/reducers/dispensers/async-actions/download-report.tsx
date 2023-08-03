import { Dispatch } from 'redux'
import { RootState } from 'data/store'
import { DispensersActions } from '../types'
import { dispensersApi } from 'data/api'
import * as actionsCampaigns from '../actions'
import {
  downloadLinksAsCSV,
  alertError,
  defineNetworkName
} from 'helpers'
import { plausibleApi } from 'data/api'

const downloadReport = (
  dispenser_id: string
) => {
  return async (
    dispatch: Dispatch<DispensersActions>,
    getState: () => RootState
  ) => {
    const { user: { chainId } } = getState()
    if (!dispenser_id) { return alertError ('dispenser_id is not provided') }
    try {
    
      const { data: { links_data } } = await dispensersApi.getReport(dispenser_id)
      if (links_data.length === 0) {
        alertError('No data found for report. At least one claimed link is needed for report')
        return dispatch(actionsCampaigns.setLoading(false))
      }
      downloadLinksAsCSV(links_data, `REPORT-${dispenser_id}`)
      plausibleApi.invokeEvent({
        eventName: 'download_report',
        data: {
          network: defineNetworkName(chainId),
          type: 'dispenser',
          dispenser_id
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