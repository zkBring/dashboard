import { TCampaignStatus, TTokenType } from './index.js'

type TRetroDrop = {
  title: string,
  ipfsHash: string,
  address: string,
  chainId: number,
  description: string,
  logoURL: string,
  status: TCampaignStatus,
  tokenAddress: string,
  type: TTokenType,
  decimals: number | null,
  dropAddress: string
}

export default TRetroDrop