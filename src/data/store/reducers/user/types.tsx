import { ActionType } from 'typesafe-actions';
import * as actions from './actions'
import { Dispatch } from 'redux'

export interface UserState {
  address: string
  loading: boolean,
  provider: any,
  chainId: number | null,
  nativeTokenAmount: string | null,
  nativeTokenAmountFormatted: string | null,
  tokenAmount: string | null,
  tokenAmountFormatted: string | null
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
