import { TLink } from './index'

type TLinksBatch = {
  claim_links: TLink[]
  batch_description: string
  created_at?: string
  batch_id: string
  claim_links_count: number
  links_claimed: number
}

export default TLinksBatch
