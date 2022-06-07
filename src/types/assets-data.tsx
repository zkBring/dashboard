import { BigNumber } from 'mathjs'
import { TTokenType } from 'types'

export type TAsset = {
  amount?: string,
  id?: number | string,
  native_tokens_amount?: string,
  original_amount?: string,
  original_native_tokens_amount?: string
}

export type TTotalAmount = {
  ids?: (number | string)[];
  amount?: BigNumber;
  original_amount?: BigNumber;
  native_tokens_amount: BigNumber;
  original_native_tokens_amount: BigNumber;
}

export type TDefineTotalAmountERC20 = (assets: TAsset[] ) => TTotalAmount

export type TDefineTotalAmountERC721 = (assets: TAsset[] ) => TTotalAmount

export type TDefineAssetsTotalAmount = (assets: TAsset[], type: TTokenType ) => TTotalAmount

type TAssetsData = TAsset[]

export default TAssetsData