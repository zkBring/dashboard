import axios, { AxiosResponse } from 'axios'
import { TCampaign } from 'types'

type TUpdateCampaignResponse = {
  success: boolean,
  campaign: TCampaign
}

type TUpdateCampaign = (
  campaign_id: string,
  description: string,
  is_public: boolean
) => Promise<AxiosResponse<TUpdateCampaignResponse>>

export default TUpdateCampaign