import { Dispatch } from 'redux'
import * as actionsCampaign from '../actions'
import { CampaignActions } from '../types'
import { TTokenType } from 'types'
import { IAppDispatch, RootState } from 'data/store'

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
