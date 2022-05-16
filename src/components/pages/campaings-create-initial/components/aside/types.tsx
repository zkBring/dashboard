import {
  TAsset,
  TTotalAmount,
  TTokenType
} from 'types'
import { ReactElement } from 'react'

export type TAside = {
  assets: TAsset[];
  symbol: string | null;
  type: TTokenType
}

export type TDefineTitle = (
  symbol: string | null,
  totalAmount: TTotalAmount,
  assets:  TAsset[]
) => ReactElement | undefined

export type TDefineTotalTitle = (
  symbol: string | null,
  totalAmount: TTotalAmount
) => string

export type TCountAssetsTotalAmount = (
  assets:  TAsset[],
  symbol: string | null,
  type: TTokenType
) => string
