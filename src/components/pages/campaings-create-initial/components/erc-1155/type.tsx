import { TTokenType, TCampaign } from 'types'

export type TProps = {
  type: TTokenType,
  campaign?: TCampaign | null
}
