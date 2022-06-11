import { TLink } from './index'

type TLinksBatch = {
  date: string,
  claim_links: TLink[],
  sponsored?: boolean,
  batch_description: string
}

export default TLinksBatch
