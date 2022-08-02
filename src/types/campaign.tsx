import { TTokenType } from './index.js'
import { TLinksBatch, TClaimPattern } from 'types'

type TCampaign = {
  title: string,
  chain_id: number,
  campaign_id: string,
  campaign_number: string,
  token_address: string,
  token_standard: TTokenType,
  symbol: string,
  wallet: string,
  proxy_contract_address: string,
  encrypted_signer_key: string,
  signer_address: string,
  batches: TLinksBatch[],
  creator_address: string,
  created_at?: string,
  claim_pattern: TClaimPattern
}

export default TCampaign
