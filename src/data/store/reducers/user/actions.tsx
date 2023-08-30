import LinkdropSDK from 'linkdrop-sdk'
import { action } from 'typesafe-actions'
import { Constants } from './constants'
import { TAuthorizationStep, TNFTContract, TAlchemyNFTToken, TERC20Contract, TERC20TokenList } from 'types'
import { BigNumber } from 'ethers'

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

export function setTokenListERC20(tokenListERC20: TERC20TokenList) {
  return action(
    Constants.USER_SET_TOKEN_LIST_ERC20,
    {
      tokenListERC20
    }
  )
}



export function setContracts(contracts: TNFTContract[]) {
  return action(
    Constants.USER_SET_CONTRACTS,
    {
      contracts
    }
  )
}

export function setContractsERC20(contractsERC20: TERC20Contract[]) {
  return action(
    Constants.USER_SET_CONTRACTS_ERC20,
    {
      contractsERC20
    }
  )
}

export function setNFTs(nfts: TAlchemyNFTToken[]) {
  return action(
    Constants.USER_SET_NFTS,
    {
      nfts
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

export function setJsonRPCProvider(jsonRPCProvider: any) {
  return action(
    Constants.USER_SET_JSON_RPC_PROVIDER,
    {
      jsonRPCProvider
    }
  )
}

export function setSigner(signer: any) {
  return action(
    Constants.USER_SET_SIGNER,
    {
      signer
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

export function setTokenAmount(tokenAmount: BigNumber) {
  return action(
    Constants.USER_SET_TOKEN_AMOUNT,
    {
      tokenAmount
    }
  )
}

export function setNativeTokenAmount(nativeTokenAmount: BigNumber) {
  return action(
    Constants.USER_SET_NATIVE_TOKEN_AMOUNT,
    {
      nativeTokenAmount
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

export function setWhitelisted (
  whitelisted: boolean | null
) {
  return action(
    Constants.USER_SET_WHITELISTED,
    {
      whitelisted
    }
  )
}

export function setComission (
  comission: string
) {
  return action(
    Constants.USER_SET_COMISSION,
    {
      comission
    }
  )
}