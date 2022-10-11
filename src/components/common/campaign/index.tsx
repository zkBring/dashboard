import {
  FC
} from 'react'
import {
  Campaign,
  CampaignRow,
  CampaignText,
  CampaignValue,
  CampaignButtons,
  CampaignButton,
  CampaignTitle,
  Divider
} from './styled-components'
import {
  formatDate,
  defineEtherscanUrl,
  shortenString,
  defineNetworkName,
  capitalize
} from 'helpers'
import { TProps } from './types'

const CampaignComponent: FC<TProps> = ({
  created_at,
  id,
  symbol,
  chainId,
  type,
  proxyContractAddress,
  title,
  linksAmount,
  claimPattern
}) => {
  const dateFormatted = created_at && formatDate(created_at)
  const scanUrl = defineEtherscanUrl(Number(chainId), `/address/${proxyContractAddress}`)
  const networkName = defineNetworkName(Number(chainId))
  return <Campaign>
    <CampaignTitle>{title || 'No name'}</CampaignTitle>
    <CampaignRow>
      <CampaignText>Contract</CampaignText>
      <CampaignValue>{shortenString(proxyContractAddress)}</CampaignValue>
    </CampaignRow>
    <CampaignRow>
      <CampaignText>Network</CampaignText>
      <CampaignValue>{capitalize(networkName)}</CampaignValue>
    </CampaignRow>
    <CampaignRow>
      <CampaignText>Type</CampaignText>
      <CampaignValue>{type}</CampaignValue>
    </CampaignRow>
    <CampaignRow>
      <CampaignText>Links</CampaignText>
      <CampaignValue>COMING SOON</CampaignValue>
    </CampaignRow>
    <Divider />
    <CampaignRow>
      <CampaignText>Claim pattern</CampaignText>
      <CampaignValue>{capitalize(claimPattern)}</CampaignValue>
    </CampaignRow>
    <CampaignRow>
      <CampaignText>Date created</CampaignText>
      <CampaignValue>{dateFormatted}</CampaignValue>
    </CampaignRow>
    <CampaignButtons>
      <CampaignButton
        to={`/campaigns/${id}`}
        title="Details"
      />
      {/* <CampaignButton
        title='View Contract'
        href={scanUrl}
        target='_blank'
        appearance='action-inverted'
      /> */}
    </CampaignButtons>  
  </Campaign>
}

export default CampaignComponent