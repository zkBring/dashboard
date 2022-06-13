import {
  FC
} from 'react'
import {
  Campaign,
  CampaignRow,
  CampaignText,
  CampaignValue,
  CampaignType,
  CampaignButtons,
  CampaignButton
} from './styled-components'
import {
  formatDate,
  defineEtherscanUrl
} from 'helpers'
import { TTokenType, TLinksBatch } from 'types'

type TProps = {
  created_at?: string,
  id: string,
  symbol: string,
  chainId: number,
  type: TTokenType,
  batches: TLinksBatch[],
  proxyContractAddress: string,
  title: string
}

const CampaignComponent: FC<TProps> = ({
  created_at,
  id,
  symbol,
  chainId,
  type,
  batches,
  proxyContractAddress,
  title
}) => {
  const dateFormatted = created_at && formatDate(created_at)
  const scanUrl = defineEtherscanUrl(chainId, `/address/${proxyContractAddress}`)
  return <Campaign title={title || 'No name'}>
    <CampaignType>{type}</CampaignType>
    <CampaignRow>
      <CampaignText>Created: </CampaignText><CampaignValue>{dateFormatted}</CampaignValue>
    </CampaignRow>
    <CampaignRow>
      <CampaignText>{batches.length} batch(es)</CampaignText>
    </CampaignRow>
    <CampaignButtons>
      <CampaignButton
        to={`/campaigns/${id}`}
        title="Links"
        appearance='action'
      />
      <CampaignButton
        title='View Contract'
        href={scanUrl}
        target='_blank'
        appearance='action-inverted'
      />
    </CampaignButtons>  
  </Campaign>
}

export default CampaignComponent