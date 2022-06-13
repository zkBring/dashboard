import { TTokenType } from './index.js'
import { TLinksBatch } from 'types'

type TCampaign = {
  title: string,
  chain_id: number,
  id: string, // айдишник на основе которого создается прокси
  token_address: string,
  type: TTokenType, // erc-721, ...
  symbol: string, // символ кампании
  wallet: string, // какой воллет в урле прописан (по умолчанию metamask)
  proxy_contract_address: string,
  signer_key: string,
  signer_address: string,
  batches: TLinksBatch[], // батчи линков
  creator_address: string, // публичный ключ мастера
  created_at?: string // дата создания кампании
}

export default TCampaign
