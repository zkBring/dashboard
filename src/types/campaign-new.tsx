import { TTokenType } from './index.js'
import { TLink } from 'types'

type TCampaign = {
  title: string,
  chain_id: number,
  campaign_number: string,
  token_address: string,
  token_standard: TTokenType,
  symbol: string,
  wallet: string,
  proxy_contract_address: string,
  encrypted_signer_key: string,
  signer_address: string,
  claim_links: TLink[],
  sponsored?: boolean,
  batch_description: string,
  creator_address: string,
  created_at?: string
}

export default TCampaign
