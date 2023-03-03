import { Dispatch } from 'redux'
import * as userActions from '../actions'
import { TQRSet, TCampaign } from 'types'
import * as qrsActions from '../../qrs/actions'
import * as campaignsActions from '../../campaigns/actions'

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
  REACT_APP_CLAIM_APP
} = process.env

const initialization = (
  chainId: number | null, address: string
) => {
  return async (dispatch: Dispatch<UserActions> & Dispatch<QRsActions> & Dispatch<CampaignsActions>, getState: () => RootState) => {
    if (!REACT_APP_CLAIM_APP) {
      return alert('REACT_APP_CLAIM_APP is not provided in .env file')
    }
    if (!chainId) {
      return alert('Chain is not detected')
    }
    if (!REACT_APP_INFURA_ID) {
      return alert('REACT_APP_INFURA_ID is not provided in .env file')
    }
    const campaigns: { data: { campaigns_array: TCampaign[] } } = await campaignsApi.get(chainId)
    const qrs: { data: { qr_sets: TQRSet[] } } = await qrsApi.get()
    dispatch(qrsActions.updateQrs(qrs.data.qr_sets))
    dispatch(campaignsActions.updateCampaigns(campaigns.data.campaigns_array))

    const sdk = new LinkdropSDK({
      claimApiUrl: 'https://staging.claim.ledger.com'
    })

    dispatch(userActions.setSDK(sdk))
  }
}

export default initialization