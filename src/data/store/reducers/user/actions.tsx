import LinkdropSDK from 'linkdrop-sdk'
import { action } from 'typesafe-actions'
import { Constants } from './constants'
import { TAuthorizationStep, TOwnedTokens } from 'types'

export function setAddress(address: string) {
  return action(
    Constants.USER_SET_ADDRESS,
    {
      address
    }
  )
}

export function setLoading(loading: boolean) {
  return action(
    Constants.USER_SET_LOADING,
    {
      loading
    }
  )
}

export function setNFTTokens(nftTokens: TOwnedTokens) {
  return action(
    Constants.USER_SET_NFT_TOKENS,
    {
      nftTokens
    }
  )
}

export function setAuthorizationStep (authorizationStep: TAuthorizationStep) {
  return action(
    Constants.USER_SET_AUTHORIZATION_STEP,
    {
      authorizationStep
    }
  )
}

export function setDashboardKey(dashboardKey: string) {
  return action(
    Constants.USER_SET_DASHBOARD_KEY,
    {
      dashboardKey
    }
  )
}

export function setProvider(provider: any) {
  return action(
    Constants.USER_SET_PROVIDER,
    {
      provider
    }
  )
}

export function setChainId(chainId: number) {
  return action(
    Constants.USER_SET_CHAIN_ID,
    {
      chainId
    }
  )
}

export function setTokenAmount(tokenAmount: string, tokenAmountFormatted: string) {
  return action(
    Constants.USER_SET_TOKEN_AMOUNT,
    {
      tokenAmount,
      tokenAmountFormatted
    }
  )
}

export function setNativeTokenAmount(
  nativeTokenAmount: string,
  nativeTokenAmountFormatted: string
) {
  return action(
    Constants.USER_SET_NATIVE_TOKEN_AMOUNT,
    {
      nativeTokenAmount,
      nativeTokenAmountFormatted
    }
  )
}


export function setSDK (
  sdk: LinkdropSDK
) {
  return action(
    Constants.USER_SET_SDK,
    {
      sdk
    }
  )
}