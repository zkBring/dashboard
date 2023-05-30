import { CampaignState } from '../data/store/reducers/campaign/types'
import { TCampaignCreateStep } from 'types'

type TCampaignDraft = {
  id: number | string
  campaign: CampaignState
  step: TCampaignCreateStep
  chainId: number
  creatorAddress: string
  updatedAt: number
  createdAt: number
}

export default TCampaignDraft
