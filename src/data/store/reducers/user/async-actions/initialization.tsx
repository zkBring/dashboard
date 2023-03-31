import { Dispatch } from 'redux'
import * as userActions from '../actions'
import { TQRSet, TCampaign } from 'types'
import * as qrsActions from '../../qrs/actions'
import * as campaignsActions from '../../campaigns/actions'
import {
  getNativeTokenAmount,
  getComission
 } from './index'

import {
  UserActions,
} from '../types'
import {
  QRsActions
} from '../../qrs/types'
import {
  CampaignsActions
} from '../../campaigns/types'

import LinkdropSDK from 'linkdrop-sdk'
import { RootState } from 'data/store'
import { campaignsApi, qrsApi } from 'data/api'

const {
  REACT_APP_INFURA_ID,
  REACT_APP_CLAIM_APP,
  REACT_APP_SERVER_URL
} = process.env

const initialization = () => {
  return async (
    dispatch: Dispatch<UserActions> & Dispatch<QRsActions> & Dispatch<CampaignsActions>,
    getState: () => RootState
  ) => {
    const { user: { address, chainId, provider }} = getState()
    if (!REACT_APP_CLAIM_APP) {
      return alert('REACT_APP_CLAIM_APP is not provided in .env file')
    }
    if (!REACT_APP_SERVER_URL) {
      return alert('REACT_APP_SERVER_URL is not provided in .env file')
    }
    if (!chainId) {
      return alert('Chain id is not provided')
    }
    if (!REACT_APP_INFURA_ID) {
      return alert('REACT_APP_INFURA_ID is not provided in .env file')
    }
    try {
      const campaigns: { data: { campaigns_array: TCampaign[] } } = await campaignsApi.get(chainId)
      dispatch(campaignsActions.updateCampaigns(campaigns.data.campaigns_array))
      const qrs: { data: { qr_sets: TQRSet[] } } = await qrsApi.get()
      dispatch(qrsActions.updateQrs(qrs.data.qr_sets))
      const comissionRes = await getComission(
        chainId,
        address
      )
      if (comissionRes) {
        const { comission, whitelisted } = comissionRes
        dispatch(userActions.setWhitelisted(whitelisted))
        dispatch(userActions.setComission(comission))
      }
    } catch (err) {
      console.log(err)
      alert('Error occured with data fetch, check console for information')
    }

    await getNativeTokenAmount(
      dispatch,
      chainId,
      address,
      provider
    )

    const sdk = new LinkdropSDK({
      claimHostUrl: REACT_APP_CLAIM_APP,
      apiHost: REACT_APP_SERVER_URL
    })

    dispatch(userActions.setSDK(sdk))
  }
}

export default initialization