import { TCampaignStatus, TTokenType } from './index.js'
import { TAssetsData, TLinksBatch } from 'types'

type TCampaign = {
  title: string,
  chainId: number,
  id: string, // айдишник на основе которого создается прокси
  description: string, // хз надо или нет
  logoURL: string, // хз надо или нет
  status: TCampaignStatus, // это по умолчанию как active, но могут быть и другие статусы кампании типа stopped
  tokenAddress: string,
  type: TTokenType, // erc-721, ...
  decimals: number,
  assets: TAssetsData, // тут список ассетов кампании. В идеале это сохранять тоже, так как на основе этих данных можно потом посчитать все ассеты которые лежат во всех батчах с линками. то есть это голые данные по всем линкам
  symbol: string, // символ кампании
  wallet: string, // какой воллет в урле прописан (по умолчанию metamask)
  proxyContractAddress: string,
  approved: boolean,
  secured: boolean,
  privateKey: string,
  batches: TLinksBatch[], // батчи линков
  masterAddress: string, // публичный ключ мастера
  date: string // дата создания кампании
}

export default TCampaign