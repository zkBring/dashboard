
import { Dispatch } from 'redux'
import * as actionsCampaign from '../actions'
import { CampaignActions } from '../types'
import { IAppDispatch } from 'data/store'

import {
  TZKTLSService,
  TProofProvider,
} from 'types'

function setAudienceData (
  zkTLSService: TZKTLSService,
  proofProvider: TProofProvider,
  appId: string,
  secret: string,
  providerId: string,
  handleKey: string,
  callback?: () => void
) {
  return async (
    dispatch: Dispatch<CampaignActions> & IAppDispatch
  ) => {

    dispatch(actionsCampaign.setZkTLSService(zkTLSService))
    dispatch(actionsCampaign.setProofProvider(proofProvider))

    if (proofProvider === 'custom') {

      console.log('HERE111', proofProvider)

      console.log({
        handleKey,
        appId,
      })
      dispatch(actionsCampaign.setHandleKey(handleKey))
      dispatch(actionsCampaign.setAppId(appId))
      dispatch(actionsCampaign.setSecret(secret))
      dispatch(actionsCampaign.setProviderId(providerId))
    }

    try {
      if (callback) {
        callback()
      }
    } catch (err) {
      console.error({ err })
    }
  }
}

export default setAudienceData
