import { Dispatch } from 'redux'
import * as userActions from '../actions'
import { TQRSet, TCampaign, TDispenser, TCollection } from 'types'
import * as campaignsActions from '../../campaigns/actions'
import * as dispensersActions from '../../dispensers/actions'
import { UserActions } from '../types'
import { CampaignsActions } from '../../campaigns/types'
import { DispensersActions } from '../../dispensers/types'


import LinkdropBatchSDK from 'linkdrop-batch-sdk'
import { RootState } from 'data/store'
import {
  campaignsApi,
  dispensersApi,
  countriesApi,
} from 'data/api'
import { alertError, defineClaimAppURL } from 'helpers'

const {
  REACT_APP_INFURA_ID,
  REACT_APP_SERVER_URL,
  REACT_APP_ZUPLO_API_KEY
} = process.env

const initialization = () => {
  return async (
    dispatch: Dispatch<UserActions> &
              Dispatch<CampaignsActions> &
              Dispatch<DispensersActions>,
    getState: () => RootState
  ) => {
    const { user: { address, chainId }} = getState()
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
      dispatch(campaignsActions.setLoading(true))
      dispatch(dispensersActions.setLoading(true))

      const countries = await countriesApi.get()
      if (countries) {
        dispatch(userActions.setCountries(countries.data))
      }

      await Promise.all([
        campaignsApi.get(chainId),
        dispensersApi.get()
      ]).then(([
        campaignsData,
        dispensersData
      ]) => {
        const campaigns: { data: { campaigns_array: TCampaign[] } } = campaignsData 
        const dispensers: { data: { dispensers: TDispenser[] } } = dispensersData

        dispatch(dispensersActions.setDispensers(dispensers.data.dispensers))
        dispatch(campaignsActions.updateCampaigns(campaigns.data.campaigns_array))

        dispatch(campaignsActions.setLoading(false))
        dispatch(dispensersActions.setLoading(false))

      })

    } catch (err) {
      console.log(err)
      alertError('Error occured with data fetch, check console for information')
    }

    const sdk = new LinkdropBatchSDK({
      claimHostUrl: claimAppURL,
      apiHost: REACT_APP_SERVER_URL,
      apiKey: REACT_APP_ZUPLO_API_KEY as string
    })

    dispatch(userActions.setSDK(sdk))
  }
}

export default initialization