
import { Dispatch } from 'redux'
import * as actionsCampaign from '../actions'
import { CampaignActions } from '../types'
import { UserActions } from '../../user/types'
import { RootState } from 'data/store'
import { alertError } from 'helpers'

const openDraft = (
  id: string,
  callback: () => void
) => {
  return async (
    dispatch: Dispatch<CampaignActions | UserActions>,
    getState: () => RootState
  ) => {
    const { campaigns: { drafts } } = getState()
    if (!id) {
      return alertError('Draft id is not correct')
    }
    const draft = drafts.find(draft => draft.id === id)
    if (!draft) {
      return alertError('Draft id is not correct')
    }
    dispatch(actionsCampaign.setCampaign(draft.campaign))
    dispatch(actionsCampaign.setLoading(false))
    callback && callback() 
  }
}

export default openDraft