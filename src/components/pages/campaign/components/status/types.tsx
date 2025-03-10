import { TCampaign } from "types"
import { TCampaignStatus } from '../../types'

type TProps = {
  campaign: TCampaign
  status: TCampaignStatus
  setStatus: (status: TCampaignStatus) => void
}

export default TProps
