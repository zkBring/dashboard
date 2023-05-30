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

const removeCampaignFromDrafts = (
  draftId: string
) => {
  return async (
    dispatch: Dispatch<CampaignActions | UserActions | CampaignsActions>,
    getState: () => RootState
  ) => {

    let {
      campaigns: { drafts }
    } = getState()

    try {
      const draftsUpdated = drafts.filter(draft => draft.id !== draftId)
      writeCampaignToLS(draftsUpdated)
      dispatch(actionsCampaigns.setDrafts(draftsUpdated))
    } catch (err) {
      alertError('Check console for more info')
      console.error(err)
    }
  }
}

export default removeCampaignFromDrafts