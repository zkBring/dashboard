import LinkdropSDK from '@linkdrop/sdk';
import { action } from 'typesafe-actions';
import { Constants } from './constants';

export function setAddress(address: string) {
  return action(
    Constants.USER_SET_ADDRESS,
    // payload
    {
      address
    }
  )
}

export function setLoading(loading: boolean) {
  return action(
    Constants.USER_SET_LOADING,
    // payload
    {
      loading
    }
  )
}

export function setDashboardKey(dashboardKey: string) {
  return action(
    Constants.USER_SET_DASHBOARD_KEY,
    // payload
    {
      dashboardKey
    }
  )
}

export function setProvider(provider: any) {
  return action(
    Constants.USER_SET_PROVIDER,
    // payload
    {
      provider
    }
  )
}

export function setChainId(chainId: number) {
  return action(
    Constants.USER_SET_CHAIN_ID,
    // payload
    {
      chainId
    }
  )
}

export function setTokenAmount(tokenAmount: string, tokenAmountFormatted: string) {
  return action(
    Constants.USER_SET_TOKEN_AMOUNT,
    // payload
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
    // payload
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
    // payload
    {
      sdk
    }
  )
}