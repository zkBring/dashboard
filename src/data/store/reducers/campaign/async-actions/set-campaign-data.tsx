import { Dispatch } from 'redux'
import * as actionsCampaign from '../actions'
import { CampaignActions } from '../types'
import { UserActions } from '../../user/types'
import { RootState, IAppDispatch } from 'data/store'

function setCampaignData (
  title: string,
  description: string,
  callback: () => void
) {
  // @ts-ignore
  return async (
    dispatch: Dispatch<CampaignActions> & Dispatch<UserActions> & IAppDispatch,
    getState: () => RootState
  ) => {
    dispatch(actionsCampaign.setTitle(title))
    dispatch(actionsCampaign.setDescription(description))
    callback && callback()
  }
}

export default setCampaignData
