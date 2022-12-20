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
    approveERC20: (callback: () => void) => {
      dispatch(
        userAsyncActions.approveERC20(callback)
      )
    },
    approveERC721: (callback: () => void) => {
      dispatch(
        userAsyncActions.approveERC721(callback)
      )
    },
    approveERC1155: (callback: () => void) => {
      dispatch(
        userAsyncActions.approveERC1155(callback)
      )
    },
    grantRole: (callback: () => void) => {
      dispatch(
        userAsyncActions.grantRole(callback)
      )
    },
    checkIfApproved: (
      callback: () => void,
    ) => {
      dispatch(
        userAsyncActions.checkIfApproved(callback)
      )
    },
    checkIfGranted: (
      callback: () => void,
    ) => {
      dispatch(
        userAsyncActions.checkIfGranted(callback)
      )
    },
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

const patterns = [
  { value: 'mint', label: 'Mint (tokens will be minted to user address at claim)' },
  { value: 'transfer', label: 'Transfer (tokens should be preminted, and will be transferred to user at claim)' }
]

const CampaignsCreateApprove: FC<ReduxType> = ({
  campaigns,
  checkIfApproved,
  tokenStandard,
  checkIfGranted,
  grantRole,
  approveERC20,
  approveERC721,
  approveERC1155,
  loading,
  title,
  tokenAddress,
  chainId,
  assetsOriginal,
  assets
}) => {
  const { id } = useParams<TLinkParams>()
  const campaign = id ? campaigns.find(campaign => campaign.campaign_id === id) : null
  const currentCampaignTitle = campaign ? campaign.title : title
  const currentTokenAddress = campaign ? campaign.token_address : tokenAddress
  const currentCampaignChainId = campaign ? campaign.chain_id : chainId
  const currentCampaignTokenStandard = campaign ? campaign.token_standard : tokenStandard

  const history = useHistory()
  const redirectURL = campaign ? `/campaigns/edit/${tokenStandard}/${campaign.campaign_id}/secure` : `/campaigns/new/${tokenStandard}/secure`
  const [ claimPattern, setClaimPattern ] = useState<TClaimPattern>(campaign?.claim_pattern || 'mint')

  useEffect(() => {
    if (!campaign) {
      return
    }
    if (campaign && campaign.claim_pattern === 'mint') {
      return checkIfGranted(() => history.push(redirectURL))
    }
    if (tokenStandard === 'ERC20') { return } // always show when transfer
    checkIfApproved(() => history.push(redirectURL))
  }, [])

  return <Container>
    <WidgetComponent title='Claim pattern'>
      <WidgetSubtitle>Choose the desired claim pattern and proceed with the appropriate transaction to enable it</WidgetSubtitle>
      <StyledRadio
        disabled={Boolean(campaign) || loading}
        value={claimPattern}
        radios={patterns}
        onChange={(value) => {
          console.log({ value })
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
        title: claimPattern === 'transfer' ? 'Approve' : 'Grant Role',
        action: () => {
          const callback = () => {
            history.push(redirectURL)
          }
          if (claimPattern === 'mint') {
            return grantRole(callback)
          }
          if (tokenStandard === 'ERC20') {
            approveERC20(callback)
          } else if (tokenStandard === 'ERC721') {
            approveERC721(callback)
          } else {
            approveERC1155(callback)
          }
        },
        disabled: loading,
        loading
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

        {currentCampaignTokenStandard && assetsOriginal && <AssetsList data={assetsOriginal} type={currentCampaignTokenStandard} />}

        {assets && <AsideRow>
          <AsideText>Total links</AsideText>
          <AsideValue>{assets.length}</AsideValue>
        </AsideRow>}

        <AsideRow>
          <AsideText>Claim pattern</AsideText>
          <AsideValue>{claimPattern}</AsideValue>
        </AsideRow>

      </AsideContent>
    </Aside>
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(CampaignsCreateApprove)
