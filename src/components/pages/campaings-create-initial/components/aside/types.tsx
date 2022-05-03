import {
  TAsset,
  TTotalAmountERC20
} from 'types'
import { ReactElement } from 'react'

export type TAside = {
  assets: TAsset[];
  symbol: string | null;
}

export type TDefineTitle = (symbol: string | null, totalAmount: TTotalAmountERC20, assets:  TAsset[]) => ReactElement | undefined

export type TDefineTotalTitle = (symbol: string | null, totalAmount: TTotalAmountERC20) => string
