import { TTokenType } from './index.js'
import { TAssetsData, TLinksBatch } from 'types'

type TCampaign = {
  title: string,
  chain_id: number,
  id: string, // айдишник на основе которого создается прокси
  token_address: string,
  type: TTokenType, // erc-721, ...
  decimals: number,
  assets: TAssetsData, // тут список ассетов кампании. В идеале это сохранять тоже, так как на основе этих данных можно потом посчитать все ассеты которые лежат во всех батчах с линками. то есть это голые данные по всем линкам
  symbol: string, // символ кампании
  wallet: string, // какой воллет в урле прописан (по умолчанию metamask)
  proxy_contract_address: string,
  signer_key: string,
  batches: TLinksBatch[], // батчи линков
  creator_address: string, // публичный ключ мастера
  date: string // дата создания кампании
}

export default TCampaign
