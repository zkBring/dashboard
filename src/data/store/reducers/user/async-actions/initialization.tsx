import { Dispatch } from 'redux'
import * as userActions from '../actions'
import { TQRSet, TCampaign, TDispenser, TCollection } from 'types'
import * as qrsActions from '../../qrs/actions'
import * as campaignsActions from '../../campaigns/actions'
import * as dispensersActions from '../../dispensers/actions'
import * as colllectionsActions from '../../collections/actions'
import { UserActions } from '../types'
import { QRsActions } from '../../qrs/types'
import { CampaignsActions } from '../../campaigns/types'
import { DispensersActions } from '../../dispensers/types'
import { CollectionsActions } from '../../collections/types'
import LinkdropSDK from 'linkdrop-sdk'
import { RootState } from 'data/store'
import { campaignsApi, qrsApi, dispensersApi, collectionsApi } from 'data/api'
import { alertError, defineClaimAppURL } from 'helpers'

const {
  REACT_APP_INFURA_ID,
  REACT_APP_SERVER_URL
} = process.env

const initialization = () => {
  return async (
    dispatch: Dispatch<UserActions> & Dispatch<QRsActions> & Dispatch<CampaignsActions> & Dispatch<DispensersActions> & Dispatch<CollectionsActions>,
    getState: () => RootState
  ) => {
    const { user: { address, chainId, provider }} = getState()
    const claimAppURL = defineClaimAppURL(address)

    if (!REACT_APP_SERVER_URL) {
      return alertError('REACT_APP_SERVER_URL is not provided in .env file')
    }
    if (!chainId) {
      return alertError('Chain id is not provided')
    }
    if (!REACT_APP_INFURA_ID) {
      return alertError('REACT_APP_INFURA_ID is not provided in .env file')
    }
    try {
      const campaigns: { data: { campaigns_array: TCampaign[] } } = await campaignsApi.get(chainId)
      dispatch(campaignsActions.updateCampaigns(campaigns.data.campaigns_array))
      const qrs: { data: { qr_sets: TQRSet[] } } = await qrsApi.get()
      dispatch(qrsActions.updateQrs(qrs.data.qr_sets))
      const dispensers: { data: { dispensers: TDispenser[] } } = await dispensersApi.get()
      dispatch(dispensersActions.setDispensers(dispensers.data.dispensers))
      const collections: { data: { collections: TCollection[] } } = await collectionsApi.get()
      dispatch(colllectionsActions.setCollections(collections.data.collections))
    } catch (err) {
      console.log(err)
      alertError('Error occured with data fetch, check console for information')
    }

    const sdk = new LinkdropSDK({
      claimHostUrl: claimAppURL,
      apiHost: REACT_APP_SERVER_URL
    })

    dispatch(userActions.setSDK(sdk))
  }
}

export default initialization