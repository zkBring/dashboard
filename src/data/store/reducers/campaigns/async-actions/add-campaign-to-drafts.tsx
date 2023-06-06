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
import { TCampaignCreateStep, TCampaignDraft } from 'types'

const addCampaignToDrafts = (
  step: TCampaignCreateStep
) => {
  return async (
    dispatch: Dispatch<CampaignActions | UserActions | CampaignsActions>,
    getState: () => RootState
  ) => {

    let {
      campaign,
      user: { address, chainId },
      campaigns: { drafts }
    } = getState()

    try {
      const newDraft = {
        id: campaign.id as string,
        step,
        campaign: {...campaign, assets: [] },
        creatorAddress: address as string,
        chainId: chainId as number,
        updatedAt: +(new Date())
      }
      const draftIndex = drafts.findIndex(draft => draft.id === campaign.id)
      if (draftIndex > -1) {
        const draftsUpdated = drafts.map(draft => {
          if (draft.campaign.id === campaign.id) {
            return { ...draft, ...newDraft }
          }
          return draft
        })
        writeCampaignToLS(draftsUpdated)
        dispatch(actionsCampaigns.setDrafts(draftsUpdated))
      } else {
        const draftsUpdated: TCampaignDraft[] = [...drafts, {...newDraft, createdAt: +(new Date()) }]
        writeCampaignToLS(draftsUpdated)
        dispatch(actionsCampaigns.setDrafts(draftsUpdated))
      }
      

    } catch (err) {
      alertError('Check console for more info')
      console.error('Some error occured', err)
    }
  }
}

export default addCampaignToDrafts