import { TCampaign } from 'types'

export type TProps = {
  amount: string,
  sponsored: boolean,
  setSponsored: (value: boolean) => void,
  nativeTokenSymbol: string,
  campaign?: TCampaign | null
}