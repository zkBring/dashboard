import { TCampaignStatus, TTokenType } from './index.js'
import { TAssetsData, TLink } from 'types'

type TCampaign = {
  title: string,
  chainId: number,
  id: string,
  description: string,
  logoURL: string,
  status: TCampaignStatus,
  tokenAddress: string,
  type: TTokenType,
  decimals: number,
  assets: TAssetsData,
  symbol: string,
  wallet: string,
  proxyContractAddress: string,
  approved: boolean,
  secured: boolean,
  privateKey: string,
  sponsored: boolean,
  links: TLink[],
  masterAddress: string,
  date: string
}

export default TCampaign