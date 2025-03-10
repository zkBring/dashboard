import axios, { AxiosResponse } from 'axios'
import { TCampaign } from 'types'

type TGetOneCampaign = (
  campaign_id: string
) => Promise<AxiosResponse<TGetOneCampaignResponse>>

type TGetOneCampaignResponse = {
  success: boolean,
  campaign: TCampaign
}

export default TGetOneCampaign