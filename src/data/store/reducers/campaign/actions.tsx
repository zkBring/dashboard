import { action } from 'typesafe-actions';
import { Constants } from './constants';
import { TTokenType } from 'types'

export function setTokenAddress(tokenAddress: string) {
  return action(Constants.CAMPAIGN_SET_TOKEN_ADDRESS, {
    tokenAddress
  })
}

export function setMerkleTree(merkleTree: any) {
  return action(Constants.CAMPAIGN_SET_MERKLE_TREE, {
    merkleTree
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

export function setIPFS(ipfs: string) {
  return action(Constants.CAMPAIGN_SET_IPFS, {
    ipfs
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

export function setDecimals(decimals: number) {
  return action(Constants.CAMPAIGN_SET_DECIMALS, {
    decimals
  })
}

export function setRecipientsValue(recipientsValue: string) {
  return action(Constants.CAMPAIGN_SET_RECIPIENTS_VALUE, {
    recipientsValue
  })
}

export function clearNewRetroDrop() {
  return action(Constants.CAMPAIGN_CLEAR_NEW_RETRODROP)
}
