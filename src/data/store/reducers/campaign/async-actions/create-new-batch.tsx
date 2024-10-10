import { Dispatch } from 'redux'
import * as actionsCampaign from '../actions'
import * as actionsAsyncCampaigns from '../../campaigns/async-actions'
import { CampaignActions } from '../types'
import { TClaimPattern, TTokenType } from 'types'
import { IAppDispatch, RootState } from 'data/store'
import { plausibleApi } from 'data/api'
import { defineNetworkName } from 'helpers'
import { contractSpecificOptions } from 'configs/contract-specific-options'
import { campaignsApi } from 'data/api'
import * as collectionsAsyncActions from 'data/store/reducers/collections/async-actions'

function createNewBatch(
  campaign_id: string,
  token_standard: TTokenType,
  callback?: (location: string) => void
) {
  return async (
    dispatch: Dispatch<CampaignActions> & IAppDispatch,
    getState: () => RootState
  ) => {
    dispatch(
      actionsCampaign.setLoading(true)
    )
    try {

      const campaignData = await campaignsApi.getOne(String(campaign_id))
      if (campaignData.data.success) {
        const {
          token_id,
          collection_id
        } = campaignData.data.campaign

        if (token_id && collection_id) {
          dispatch(
            collectionsAsyncActions.createClaimLinks(
              collection_id,
              token_id,
              '100',
              token_standard,
              campaign_id,
              callback
            )
          )
          dispatch(
            actionsCampaign.setLoading(false)
          )
          return
        }
      }

      callback && callback(`/campaigns/edit/${token_standard}/${campaign_id}/new`)
      
    } catch (err) {
      console.error({ err })
    }

    dispatch(
      actionsCampaign.setLoading(false)
    )
  }
}

export default createNewBatch
