import { FC, useEffect, useState } from 'react'
import {
  StyledRadio,
  TextLinkStyled
} from './styled-components'
import { RootState } from 'data/store';
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { TLinkParams, TClaimPattern } from 'types'
import { useHistory } from 'react-router-dom'
import { IAppDispatch } from 'data/store'
import * as campaignAsyncActions from 'data/store/reducers/campaign/async-actions'
import {
  WidgetComponent,
  Container,
  Aside,
  TableRow,
  TableText,
  TableValue,
  AsideContent,
  TableValueShorten,
  WidgetSubtitle,
  WidgetContainer
} from 'components/pages/common'
import { Note } from 'components/common'
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
    assets,
    symbol
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
  assets,
  symbol
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
  { value: 'transfer', label: 'Transfer (tokens should be preminted and will be transferred to user at claim)' },
  { value: 'mint', label: 'Mint (tokens will be minted to user address at claim)' }
]

const CampaignsCreateInitial: FC<ReduxType> = ({
  campaigns,
  tokenStandard,
  loading,
  title,
  tokenAddress,
  chainId,
  createProxyContract,
  applyClaimPattern,
  symbol,
}) => {
  const { type, id } = useParams<TLinkParams>()
  const campaign = id ? campaigns.find(campaign => campaign.campaign_id === id) : null
  const currentCampaignTitle = campaign ? campaign.title : title
  const currentTokenAddress = campaign ? campaign.token_address : tokenAddress
  const currentCampaignChainId = campaign ? campaign.chain_id : chainId
  const currentCampaignSymbol = campaign ? campaign.symbol : symbol
  const currentCampaignTokenStandard = campaign ? campaign.token_standard : tokenStandard

  const history = useHistory()
  const [ claimPattern, setClaimPattern ] = useState<TClaimPattern>(campaign?.claim_pattern || 'transfer')

  useEffect(() => {
    createProxyContract(campaign?.campaign_number)
  }, [])

  return <Container>
    <WidgetContainer>
      <WidgetComponent title='Claim pattern'>
        <WidgetSubtitle>Choose the desired claim pattern and proceed with the appropriate transaction to enable it</WidgetSubtitle>
        <StyledRadio
          // disabled={Boolean(campaign) || loading}
          disabled={true}
          value={claimPattern}
          radios={patterns}
          onChange={(value) => {
            setClaimPattern(value)
          }}
        />
      </WidgetComponent>
      <Note>
        Mint pattern is supported in Pro plan. <TextLinkStyled target='_blank' href='https://linkdrop-2.gitbook.io/linkdrop-knoe/how-tos/main-guide/mint-pattern-requirements'>Learn more {`->`}</TextLinkStyled>
      </Note>
    </WidgetContainer>
    
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
        <TableRow>
          <TableText>Title of campaign</TableText>
          <TableValueShorten>{currentCampaignTitle}</TableValueShorten>
        </TableRow>

        {currentTokenAddress && <TableRow>
          <TableText>Token address</TableText>
          <TableValue>{shortenString(currentTokenAddress)}</TableValue>
        </TableRow>}

        {currentCampaignSymbol && <TableRow>
          <TableText>Token name</TableText>
          <TableValue>{currentCampaignSymbol}</TableValue>
        </TableRow>}

        {currentCampaignTokenStandard && <TableRow>
          <TableText>Token standard</TableText>
          <TableValue>{currentCampaignTokenStandard}</TableValue>
        </TableRow>}

        {currentCampaignChainId && <TableRow>
          <TableText>Network</TableText>
          <TableValue>{defineNetworkName(Number(currentCampaignChainId))}</TableValue>
        </TableRow>}


      </AsideContent>
    </Aside>
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(CampaignsCreateInitial)
