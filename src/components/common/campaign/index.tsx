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
  CampaignButton,
  CampaignTitle
} from './styled-components'
import {
  formatDate,
  defineEtherscanUrl
} from 'helpers'
import { TTokenType } from 'types'

type TProps = {
  created_at?: string,
  id: string,
  symbol: string,
  chainId: number,
  type: TTokenType,
  proxyContractAddress: string,
  title: string
}

const CampaignComponent: FC<TProps> = ({
  created_at,
  id,
  symbol,
  chainId,
  type,
  proxyContractAddress,
  title
}) => {
  const dateFormatted = created_at && formatDate(created_at)
  const scanUrl = defineEtherscanUrl(Number(chainId), `/address/${proxyContractAddress}`)
  return <Campaign>
    <CampaignTitle>{title || 'No name'}</CampaignTitle>
    <CampaignType>{type}</CampaignType>
    <CampaignRow>
      <CampaignText>Created: </CampaignText><CampaignValue>{dateFormatted}</CampaignValue>
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