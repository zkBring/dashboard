import { TTokenType, TClaimPattern } from 'types'

export type TProps = {
  created_at?: string,
  id: string,
  chainId: number,
  type: TTokenType,
  proxyContractAddress: string,
  title: string,
  linksAmount: number,
  claimPattern: TClaimPattern
}