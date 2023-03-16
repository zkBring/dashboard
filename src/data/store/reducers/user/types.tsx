import { ActionType } from 'typesafe-actions';
import * as actions from './actions'
import { Dispatch } from 'redux'
import LinkdropSDK from 'linkdrop-sdk'
import { TAuthorizationStep, TAlchemyContract, TAlchemyNFTToken } from 'types'

export interface UserState {
  address: string
  loading: boolean,
  provider: any,
  chainId: number | null,
  nativeTokenAmount: string | null,
  nativeTokenAmountFormatted: string | null,
  tokenAmount: string | null,
  tokenAmountFormatted: string | null,
  sdk: LinkdropSDK | null,
  dashboardKey: null | string,
  workersCount: number,
  authorizationStep: TAuthorizationStep,
  chainsAvailable: (number | string)[],
  contracts: TAlchemyContract[],
  nfts: TAlchemyNFTToken[]
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
