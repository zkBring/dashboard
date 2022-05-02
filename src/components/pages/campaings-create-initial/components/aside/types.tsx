import { TAsset} from 'types'
import { BigNumber } from 'mathjs'
import { ReactElement } from 'react'

export type TAside = {
  assets: TAsset[];
  symbol: string | null;
}

export type TDefineTotalAmountERC20 = (assets: TAsset[], symbol: string ) => {
  amount: BigNumber;
  nativeTokensAmount: BigNumber;
  originalAmount: BigNumber;
  originalNativeTokensAmount: BigNumber;
}

export type TTotalAmount = {
  amount: BigNumber;
  nativeTokensAmount: BigNumber;
  originalAmount: BigNumber;
  originalNativeTokensAmount: BigNumber;
}

export type TDefineTitle = (symbol: string | null, totalAmount: TTotalAmount, assets:  TAsset[]) => ReactElement | undefined

export type TDefineTotalTitle = (symbol: string | null, totalAmount: TTotalAmount) => string
