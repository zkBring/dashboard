import { TLink } from './index'

type TLinksBatch = {
  date: string,
  links: TLink[],
  sponsored?: boolean
}

export default TLinksBatch
