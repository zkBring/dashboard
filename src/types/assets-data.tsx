import { BigNumber } from 'mathjs'

export type TAsset = {
  amount?: string,
  id?: string,
  nativeTokensAmount?: string,
  originalAmount?: string,
  originalNativeTokensAmount?: string
}

export type TDefineTotalAmountERC20 = (assets: TAsset[], symbol: string ) => {
  amount: BigNumber;
  nativeTokensAmount: BigNumber;
  originalAmount: BigNumber;
  originalNativeTokensAmount: BigNumber;
}

export type TTotalAmountERC20 = {
  amount: BigNumber;
  nativeTokensAmount: BigNumber;
  originalAmount: BigNumber;
  originalNativeTokensAmount: BigNumber;
}

type TAssetsData = TAsset[]

export default TAssetsData