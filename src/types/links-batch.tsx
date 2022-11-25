import { TLink } from './index'

type TLinksBatch = {
  claim_links: TLink[],
  sponsored?: boolean,
  batch_description: string,
  created_at?: string,
  batch_id: string,
  claim_links_count: number
}

export default TLinksBatch
