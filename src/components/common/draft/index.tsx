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
  Divider,
  CampaignButtonDelete
} from './styled-components'
import * as campaignAsyncActions from 'data/store/reducers/campaign/async-actions'
import * as campaignsAsyncActions from 'data/store/reducers/campaigns/async-actions'
import {
  formatDate,
  defineEtherscanUrl,
  shortenString,
  defineNetworkName,
  capitalize,
  defineNativeTokenSymbol,
  alertError
} from 'helpers'
import Icons from 'icons'
import {
  TextLink
} from 'components/common'
import { TProps } from './types'
import { TCampaignCreateStep, TClaimPattern, TTokenType } from 'types'
import { IAppDispatch } from 'data/store'
import { useHistory } from 'react-router-dom'

const mapStateToProps = ({
  user: { comission, whitelisted },
}: RootState) => ({
  comission, whitelisted
})

const mapDispatcherToProps = (dispatch: IAppDispatch) => {
  return {
    openDraft:(
      campaignId: string,
      callback: () => void
    ) => dispatch(
      campaignAsyncActions.openDraft(campaignId, callback)
    ),
    deleteDraft:(
      campaignId: string
    ) => dispatch(
      campaignsAsyncActions.removeCampaignFromDrafts(campaignId)
    )
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> &  ReturnType<typeof mapDispatcherToProps>

const definePricePerClaim = (
  whitelisted: boolean,
  sponsored: boolean,
  nativeTokenSymbol: string,
  comission: string
) => {
  if (!sponsored) { return 'Free' }
  if (whitelisted) { return `$0.2 + gas` }
  return `${comission} ${nativeTokenSymbol}`
}

const defineRedirectUrl = (
  createStep: TCampaignCreateStep,
  tokenStandard: TTokenType
) => {
  switch (createStep) {
    case 'approve':
      return `/campaigns/new/${tokenStandard}/approve`
    case 'secure':
      return `/campaigns/new/${tokenStandard}/secure`
    case 'initial':
      return `/campaigns/new/${tokenStandard}/initial`
    default:
      return `/campaigns/new`
  }
}

const defineIsSponsored = (
  createStep: TCampaignCreateStep,
  sponsored?: boolean
) => {
  if (createStep === 'initial' || createStep === 'new' || createStep === 'approve') { return '-' }
  return sponsored ? 'Enabled' : 'Disabled'
}

const defineClaimPattern = (
  createStep: TCampaignCreateStep,
  claimPattern?: TClaimPattern
) => {
  if (createStep === 'initial' || createStep === 'new') { return '-' }
  return capitalize(claimPattern)
}

const CampaignDraftComponent: FC<TProps & ReduxType> = ({
  createdAt,
  id,
  chainId,
  type,
  proxyContractAddress,
  title,
  tokenAddress,
  claimPattern,
  sponsored,
  comission,
  whitelisted,
  openDraft,
  stepToOpen,
  deleteDraft
}) => {
  const dateFormatted = createdAt && formatDate(createdAt)
  const proxyContractUrl = proxyContractAddress ? defineEtherscanUrl(Number(chainId), `/address/${proxyContractAddress}`) : '#'
  const tokenContract = tokenAddress ? defineEtherscanUrl(Number(chainId), `/address/${tokenAddress}`) : '#'

  const networkName = defineNetworkName(Number(chainId))
  const nativeTokenSymbol = defineNativeTokenSymbol({ chainId })
  const history = useHistory()
  const urlToRedirect = defineRedirectUrl(
    stepToOpen,
    type as TTokenType
  )
  return <Campaign>
    <CampaignTitle>{title || 'No name'}</CampaignTitle>
    <CampaignRow>
      <CampaignText>Contract</CampaignText>
      <CampaignValue>
        {proxyContractAddress ? <TextLink
          href={proxyContractUrl}
          target='_blank'
        >{shortenString(proxyContractAddress)}</TextLink> : '-'}
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
    <CampaignRow>
      <CampaignText>Token address</CampaignText>
      <CampaignValue>
        {tokenAddress ? <TextLink
          href={tokenContract}
          target='_blank'
        >{shortenString(tokenAddress)}</TextLink> : '-'}
      </CampaignValue>
    </CampaignRow>
    <Divider />
    <CampaignRow>
      <CampaignText>Sponsorship</CampaignText>
      <CampaignValue>{defineIsSponsored(stepToOpen, sponsored)}</CampaignValue>
    </CampaignRow>
    {sponsored && <CampaignRow>
      <CampaignText>Price per claim</CampaignText>
      <CampaignValue>{
        definePricePerClaim(
          Boolean(whitelisted),
          sponsored,
          nativeTokenSymbol,
          comission
        )
      }</CampaignValue>
    </CampaignRow>}
    <CampaignRow>
      <CampaignText>Claim pattern</CampaignText>
      <CampaignValue>{defineClaimPattern(stepToOpen, claimPattern)}</CampaignValue>
    </CampaignRow>
    <CampaignRow>
      <CampaignText>Date created</CampaignText>
      <CampaignValue>{dateFormatted}</CampaignValue>
    </CampaignRow>
    <CampaignButtons>
      <CampaignButtonDelete
        onClick={() => {
          if (!id) {
            return alertError('No draft id provided')
          }
          deleteDraft(
            id as string
          )
        }}
      >
        <Icons.TrashIcon />Delete
      </CampaignButtonDelete>
      <CampaignButton
        onClick={() => {
          if (!id) {
            return alertError('No draft id provided')
          }
          openDraft(
            id as string,
            () => history.push(urlToRedirect)
          )
        }}
        title="Continue"
      />
    </CampaignButtons>  
  </Campaign>
}

export default connect(mapStateToProps, mapDispatcherToProps)(CampaignDraftComponent)