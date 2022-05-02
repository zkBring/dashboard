import { action } from 'typesafe-actions';
import { Constants } from './constants';
import { TTokenType, TAssetsData } from 'types'

export function setTokenAddress(tokenAddress: string | null) {
  return action(Constants.CAMPAIGN_SET_TOKEN_ADDRESS, {
    tokenAddress
  })
}

export function setTitle(title: string) {
  return action(Constants.CAMPAIGN_SET_TITLE, {
    title
  })
}

export function setDescription(description: string) {
  return action(Constants.CAMPAIGN_SET_DESCRIPTION, {
    description
  })
}

export function setLogoURL(logoURL: string) {
  return action(Constants.CAMPAIGN_SET_LOGO_URL, {
    logoURL
  })
}

export function setLoading(loading: boolean) {
  return action(Constants.CAMPAIGN_SET_LOADING, {
    loading
  })
}

export function setDropAddress(dropAddress: string) {
  return action(Constants.CAMPAIGN_SET_DROP_ADDRESS, {
    dropAddress
  })
}

export function setType(type: TTokenType) {
  return action(Constants.CAMPAIGN_SET_TYPE, {
    type
  })
}

export function setDecimals(decimals: number | null) {
  return action(Constants.CAMPAIGN_SET_DECIMALS, {
    decimals
  })
}

export function setAssets(assets: TAssetsData | null) {
  return action(Constants.CAMPAIGN_SET_ASSETS, {
    assets
  })
}

export function setSymbol(symbol: string | null) {
  return action(Constants.CAMPAIGN_SET_SYMBOL, {
    symbol
  })
}

export function setWallet(wallet: string | null) {
  return action(Constants.CAMPAIGN_SET_WALLET, {
    wallet
  })
}

export function clearCampaign() {
  return action(Constants.CAMPAIGN_CLEAR)
}

export function setProxyContractAddress(proxyContractAddress: string | null) {
  return action(Constants.CAMPAIGN_SET_PROXY_CONTRACT_ADDRESS, {
    proxyContractAddress
  })
}
