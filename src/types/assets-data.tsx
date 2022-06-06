import { BigNumber } from 'mathjs'
import { TTokenType } from 'types'

export type TAsset = {
  amount?: string,
  id?: number | string,
  nativeTokensAmount?: string,
  originalAmount?: string,
  originalNativeTokensAmount?: string
}

export type TTotalAmount = {
  ids?: (number | string)[];
  amount?: BigNumber;
  originalAmount?: BigNumber;
  nativeTokensAmount: BigNumber;
  originalNativeTokensAmount: BigNumber;
}

export type TDefineTotalAmountERC20 = (assets: TAsset[] ) => TTotalAmount

export type TDefineTotalAmountERC721 = (assets: TAsset[] ) => TTotalAmount

export type TDefineAssetsTotalAmount = (assets: TAsset[], type: TTokenType ) => TTotalAmount

type TAssetsData = TAsset[]

export default TAssetsData