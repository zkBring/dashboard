import { action } from 'typesafe-actions';
import { Constants } from './constants';
import { TCampaign } from 'types'

export function addCampaign(campaign: TCampaign) {
  return action(Constants.CAMPAIGNS_ADD_NEW_CAMPAIGN, campaign)
}