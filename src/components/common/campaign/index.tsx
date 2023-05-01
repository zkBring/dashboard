import { FC } from 'react'
import { RootState } from 'data/store'
import { connect } from 'react-redux'
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
  capitalize,
  defineNativeTokenSymbol
} from 'helpers'

import {
  TextLink
} from 'components/common'
import { TProps } from './types'

const mapStateToProps = ({
  user: { comission, whitelisted },
}: RootState) => ({
  comission, whitelisted
})

type ReduxType = ReturnType<typeof mapStateToProps>

const definePricePerClaim = (
  whitelisted: boolean,
  sponsored: boolean,
  nativeTokenSymbol: string,
  comission: string
) => {
  if (!sponsored) { return 'Free' }
  if (whitelisted) { return `$0.2 + GAS` }
  return `${comission} ${nativeTokenSymbol}`
}

const CampaignComponent: FC<TProps & ReduxType> = ({
  created_at,
  id,
  chainId,
  type,
  proxyContractAddress,
  title,
  linksAmount,
  claimPattern,
  sponsored,
  linksClaimed,
  comission,
  whitelisted
}) => {
  const dateFormatted = created_at && formatDate(created_at)
  const scanUrl = defineEtherscanUrl(Number(chainId), `/address/${proxyContractAddress}`)
  const networkName = defineNetworkName(Number(chainId))
  const nativeTokenSymbol = defineNativeTokenSymbol({ chainId })
  return <Campaign>
    <CampaignTitle>{title || 'No name'}</CampaignTitle>
    <CampaignRow>
      <CampaignText>Contract</CampaignText>
      <CampaignValue>
        <TextLink
          href={scanUrl}
          target='_blank'
        >{shortenString(proxyContractAddress)}</TextLink>
      </CampaignValue>
    </CampaignRow>
    <CampaignRow>
      <CampaignText>Network</CampaignText>
      <CampaignValue>{capitalize(networkName)}</CampaignValue>
    </CampaignRow>
    <CampaignRow>
      <CampaignText>Token standard</CampaignText>
      <CampaignValue>{type}</CampaignValue>
    </CampaignRow>
    {linksAmount > 0 && <CampaignRow>
      <CampaignText>Links</CampaignText>
      <CampaignValue>{linksAmount}</CampaignValue>
    </CampaignRow>}
    <CampaignRow>
      <CampaignText>Claims</CampaignText>
      <CampaignValue>{linksClaimed || 0}</CampaignValue>
    </CampaignRow>
    <Divider />
    <CampaignRow>
      <CampaignText>Sponsorship</CampaignText>
      <CampaignValue>{sponsored ? 'Enabled' : 'Disabled'}</CampaignValue>
    </CampaignRow>
    <CampaignRow>
      <CampaignText>Price per claim</CampaignText>
      <CampaignValue>{
        definePricePerClaim(
          Boolean(whitelisted),
          sponsored,
          nativeTokenSymbol,
          comission
        )
      }</CampaignValue>
    </CampaignRow>
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
        title="Manage"
      />
    </CampaignButtons>  
  </Campaign>
}

export default connect(mapStateToProps)(CampaignComponent)