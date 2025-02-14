
import { Dispatch } from 'redux'
import * as actionsCampaign from '../../actions'
import { CampaignActions } from '../../types'
import { TAssetsData, TLinkContent } from 'types'
import { IAppDispatch } from 'data/store'
import { RootState } from 'data/store'
import * as actionsUser from '../../../user/actions'
import * as actionsAsyncUser from '../../../user/async-actions'
import { UserActions } from '../../../user/types'
import secure from './secure'
import generateLinks from './generate-links'
import createReclaimAndAddLinks from './create-reclaim-and-add-links'

function launch (
  successCallback?: (id: string | number) => void,

) {
  return async (
    dispatch: Dispatch<UserActions> & Dispatch<CampaignActions> & IAppDispatch,
    getState: () => RootState
  ) => {

    try {
      let {
        user: {
        },
        campaign: {
          launchStage
        }
      } = getState()

      const callback = async () => {

        dispatch(actionsCampaign.setLaunchStage('secure'))
        const secured = await secure(
          dispatch,
          getState
        )
        dispatch(actionsCampaign.setLaunchStage('generate_links'))

        const campaignsData = await generateLinks(
          dispatch,
          getState,

          // change
          () => {}
        )
        if (campaignsData) {
          const { campaign, batch } = campaignsData

          if (campaign && batch) {
            const {
              campaign_id
            } = campaign
  
            const {
              batch_id
            } = batch
  
            dispatch(actionsCampaign.setLaunchStage('reclaim_webproofs'))
  
            const createReclaim = await createReclaimAndAddLinks({
              dispatch,
              getState,
              campaignId: campaign_id,
              batchId: batch_id,
              successCallback
            })
          }
        }
      }

      let dashboardKey = actionsAsyncUser.useDashboardKey(
        getState
      )
  
      if (!dashboardKey) {
        dispatch(actionsUser.setDashboardKeyPopup(true))
        dispatch(actionsUser.setDashboardKeyPopupCallback(callback))
        return
      }
  
      callback()
    } catch (err) {
      console.error({ err })
    }
  }
}

export default launch
