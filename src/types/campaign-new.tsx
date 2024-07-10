import { TTokenType } from './index.js'
import { TLink, TClaimPattern } from 'types'

type TCampaignNew = {
  title: string
  chain_id: string
  campaign_number: string
  token_address: string
  token_standard: TTokenType
  symbol: string
  wallet: string
  proxy_contract_address: string
  encrypted_signer_key: string
  signer_address: string
  claim_links?: TLink[]
  sponsored?: boolean
  batch_description: string
  creator_address: string
  created_at?: string
  claim_pattern: TClaimPattern
  sdk: boolean
  proxy_contract_version: string | number
  available_countries: string[]
  available_wallets: string[]
  available_countries_on: boolean 
  claiming_finished_button_title?: string
  claiming_finished_button_url?: string
}

export default TCampaignNew
