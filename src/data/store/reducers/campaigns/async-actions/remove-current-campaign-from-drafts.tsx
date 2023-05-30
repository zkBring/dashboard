import { Dispatch } from 'redux'
import { CampaignActions } from '../../campaign/types'
import { UserActions } from '../../user/types'
import { RootState } from 'data/store'
import { CampaignsActions } from '../types'
import * as actionsCampaigns from '../actions'
import {
  alertError,
  writeCampaignToLS
} from 'helpers'
import { TCampaignCreateStep } from 'types'

const removeCurrentCampaignFromDrafts = () => {
  return async (
    dispatch: Dispatch<CampaignActions | UserActions | CampaignsActions>,
    getState: () => RootState
  ) => {

    let {
      campaign,
      campaigns: { drafts }
    } = getState()

    try {
      const draftsUpdated = drafts.filter(draft => draft.id !== campaign.id)
      writeCampaignToLS(draftsUpdated)
      dispatch(actionsCampaigns.setDrafts(draftsUpdated))
    } catch (err) {
      alertError('Check console for more info')
      console.error(err)
    }
  }
}

export default removeCurrentCampaignFromDrafts