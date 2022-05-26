import {
  TAsset,
  TTotalAmount,
  TTokenType
} from 'types'
import { ReactElement } from 'react'

export type TAside = {
  assets: TAsset[];
  symbol: string | null;
  type: TTokenType;
  chainId: number
}

export type TDefineTitle = (
  symbol: string | null,
  totalAmount: TTotalAmount,
  assets:  TAsset[],
  nativeTokenSymbol: string
) => ReactElement | undefined

export type TDefineTotalTitle = (
  symbol: string | null,
  totalAmount: TTotalAmount,
  nativeTokenSymbol: string
) => string

export type TCountAssetsTotalAmount = (
  assets:  TAsset[],
  symbol: string | null,
  type: TTokenType
) => string
