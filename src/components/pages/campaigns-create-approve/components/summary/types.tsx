import { TCampaign, TAsset, TTokenType } from "types"

export type TProps = {
  campaign?: TCampaign | null
}

export type TDefineLinksContent = (
  symbol: string,
  assets: TAsset[],
  chainId: number,
  type: TTokenType
) => string