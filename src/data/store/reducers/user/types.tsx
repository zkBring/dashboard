import { ActionType } from 'typesafe-actions';
import * as actions from './actions'
import { Dispatch } from 'redux'
import LinkdropSDK from 'linkdrop-sdk'
import { TAuthorizationStep, TAlchemyContract, TAlchemyNFTToken, TAlchemyERC20Contract, TERC20TokenList } from 'types'
import { BigNumber } from 'ethers'

export interface UserState {
  address: string
  loading: boolean
  provider: any
  jsonRPCProvider: any
  signer: any
  chainId: number | null
  nativeTokenAmount: BigNumber | null
  tokenAmount: BigNumber | null
  sdk: LinkdropSDK | null
  dashboardKey: null | string
  workersCount: number
  authorizationStep: TAuthorizationStep
  chainsAvailable: (number | string)[]
  contracts: TAlchemyContract[]
  contractsERC20: TAlchemyERC20Contract[]
  tokenListERC20: TERC20TokenList
  nfts: TAlchemyNFTToken[]
  whitelisted: boolean | null
  comission: string
}

export type UserActions = ActionType<typeof actions>;

export type TGetNativeTokenBalance = (
  dispatch: Dispatch<UserActions>,
  chainId: number,
  address: string,
  provider: any
) => void

export type TGetTokenBalance = (
  dispatch: Dispatch<UserActions>,
  address: string,
  decimals: number,
  contract: any
) => void
