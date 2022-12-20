import { FC, useEffect, useState } from 'react'
import {
  StyledRadio
} from './styled-components'
import { RootState } from 'data/store';
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { TLinkParams, TClaimPattern } from 'types'
import { useHistory } from 'react-router-dom'
import { IAppDispatch } from 'data/store'
import * as campaignAsyncActions from 'data/store/reducers/campaign/async-actions'
import * as userAsyncActions from 'data/store/reducers/user/async-actions/index'
import {
  WidgetComponent,
  Container,
  Aside,
  AsideRow,
  AsideText,
  AsideValue,
  AsideContent,
  AsideValueShorten,
  AssetsList,
  WidgetSubtitle
} from 'components/pages/common'
import { shortenString, defineNetworkName } from 'helpers'

const mapStateToProps = ({
  campaigns: {
    campaigns
  },
  campaign: {
    tokenStandard,
    loading,
    title,
    tokenAddress,
    assetsOriginal,
    assets
  },
  user: {
    chainId
  }
}: RootState) => ({
  campaigns,
  tokenStandard,
  loading,
  title,
  tokenAddress,
  chainId,
  assetsOriginal,
  assets
})

const mapDispatcherToProps = (dispatch: IAppDispatch) => {
  return {
    applyClaimPattern:(
      claimPattern: TClaimPattern,
      callback: () => void
    ) => dispatch(
      campaignAsyncActions.applyClaimPattern(claimPattern, callback)
    ),
    createProxyContract: (
      id?: string
    ) => dispatch(
      campaignAsyncActions.createProxyContract(id)
    ),
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

const patterns = [
  { value: 'mint', label: 'Mint (tokens will be minted to user address at claim)' },
  { value: 'transfer', label: 'Transfer (tokens should be preminted, and will be transferred to user at claim)' }
]

const CampaignsCreateInitial: FC<ReduxType> = ({
  campaigns,
  tokenStandard,
  loading,
  title,
  tokenAddress,
  chainId,
  assetsOriginal,
  createProxyContract,
  applyClaimPattern,
  assets
}) => {
  const { type, id } = useParams<TLinkParams>()
  const campaign = id ? campaigns.find(campaign => campaign.campaign_id === id) : null
  const currentCampaignTitle = campaign ? campaign.title : title
  const currentTokenAddress = campaign ? campaign.token_address : tokenAddress
  const currentCampaignChainId = campaign ? campaign.chain_id : chainId
  const currentCampaignTokenStandard = campaign ? campaign.token_standard : tokenStandard

  const history = useHistory()
  const [ claimPattern, setClaimPattern ] = useState<TClaimPattern>(campaign?.claim_pattern || 'mint')

  useEffect(() => {
    createProxyContract(campaign?.campaign_number)
  }, [])

  return <Container>
    <WidgetComponent title='Claim pattern'>
      <WidgetSubtitle>Choose the desired claim pattern and proceed with the appropriate transaction to enable it</WidgetSubtitle>
      <StyledRadio
        disabled={Boolean(campaign) || loading}
        value={claimPattern}
        radios={patterns}
        onChange={(value) => {
          setClaimPattern(value)
        }}
      />
    </WidgetComponent>
    <Aside
      back={{
        action: () => {
          history.goBack()
        }
      }}
      next={{
        action: () => {
          applyClaimPattern(
            claimPattern,
            () => {
              // if (tokenAddress === NATIVE_TOKEN_ADDRESS) {
              //   if (currentCampaign) {
              //     return history.push(`/campaigns/edit/${type}/${currentCampaign.campaign_id}/secure`)
              //   }
              //   return history.push(`/campaigns/new/${type}/secure`)
              // }
              if (campaign) {
                return history.push(`/campaigns/edit/${type}/${campaign.campaign_id}/approve`)
              }
              history.push(`/campaigns/new/${type}/approve`)
            }
          )
        },
      }}
      title="Summary"
      subtitle="Check and confirm details "
    >
      <AsideContent>
        <AsideRow>
          <AsideText>Title of campaign</AsideText>
          <AsideValueShorten>{currentCampaignTitle}</AsideValueShorten>
        </AsideRow>

        {currentTokenAddress && <AsideRow>
          <AsideText>Token address</AsideText>
          <AsideValue>{shortenString(currentTokenAddress)}</AsideValue>
        </AsideRow>}

        <AsideRow>
          <AsideText>Token Name</AsideText>
          <AsideValue>Coming soon</AsideValue>
        </AsideRow>

        {currentCampaignTokenStandard && <AsideRow>
          <AsideText>Token standard</AsideText>
          <AsideValue>{currentCampaignTokenStandard}</AsideValue>
        </AsideRow>}

        {currentCampaignChainId && <AsideRow>
          <AsideText>Network</AsideText>
          <AsideValue>{defineNetworkName(Number(currentCampaignChainId))}</AsideValue>
        </AsideRow>}


      </AsideContent>
    </Aside>
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(CampaignsCreateInitial)
