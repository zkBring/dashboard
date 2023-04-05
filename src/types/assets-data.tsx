import { TTokenType } from 'types'
import { BigNumber } from 'mathjs'

export type TAsset = {
  amount?: string,
  id?: number | string,
  original_amount?: string
}

export type TTotalAmount = {
  ids?: (number | string)[];
  amount?: BigNumber;
  original_amount?: BigNumber;
}

export type TDefineTotalAmountERC20 = (assets: TAsset[], decimals?: number | null) => TTotalAmount

export type TDefineTotalAmountERC721 = (assets: TAsset[] ) => TTotalAmount

export type TDefineAssetsTotalAmount = (assets: TAsset[], type: TTokenType ) => TTotalAmount

type TAssetsData = TAsset[]

export default TAssetsData