import { FC, useState, useEffect } from 'react'
import {
  StyledRadio,
  InputStyled
} from './styled-components'
import { useParams } from 'react-router-dom'

import {
  WidgetComponent,
  Container,
  Aside,
  WidgetSubtitle,
  AsideRow,
  AsideText,
  AsideValue,
  AsideContent,
  AsideValueShorten
} from 'components/pages/common'

import { RootState, IAppDispatch } from 'data/store';
import { connect } from 'react-redux'
import * as campaignAsyncActions from 'data/store/reducers/campaign/async-actions'
import { TTokenType, TLinkParams } from 'types'
import { useHistory } from 'react-router-dom'
import * as campaignActions from 'data/store/reducers/campaign/actions'
import { CampaignActions } from 'data/store/reducers/campaign/types'
import { Dispatch } from 'redux'
import { defineNetworkName } from 'helpers'

const mapStateToProps = ({
  campaign: {
    tokenStandard,
    loading,
    symbol,
    title,
    tokenAddress
  },
  campaigns: {
    campaigns
  },
  user: {
    chainId,
    provider,
    address
  }
}: RootState) => ({
  tokenStandard,
  loading,
  campaigns,
  chainId,
  provider,
  address,
  symbol,
  title,
  tokenAddress
})

const mapDispatcherToProps = (dispatch: IAppDispatch  & Dispatch<CampaignActions>) => {
  return {
    createProxyContract: (
      id?: string
    ) => dispatch(
      campaignAsyncActions.createProxyContract(id)
    ),
    setTokenContractData: (
      provider: any,
      tokenAddress: string,
      type: TTokenType,
      address: string,
      chainId: number
    ) => campaignAsyncActions.setTokenContractData(
      dispatch,
      tokenAddress,
      provider,
      type,
      address,
      chainId
    ),
    setInitialData: (
      tokenStandard: TTokenType,
      title: string,
      callback?: () => void
    ) => dispatch(
      campaignAsyncActions.setInitialData(
        tokenStandard,
        title,
        callback
      )
    ),
    clearCampaign: () => {
      dispatch(
        campaignActions.clearCampaign()
      )
    }
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatcherToProps>

const CampaignsCreateNew: FC<ReduxType> = ({
  createProxyContract,
  symbol,
  chainId,
  provider,
  address,
  campaigns,
  setTokenContractData,
  setInitialData,
  clearCampaign,
  loading
}) => {

  const history = useHistory()
  const { id } = useParams<TLinkParams>()

  const currentCampaign = id ? campaigns.find(campaign => campaign.campaign_id === id) : null
  
  const [
    tokenAddress,
    setTokenAddress
  ] = useState<string>(currentCampaign?.token_address || '')

  const [
    title,
    setTitle
  ] = useState<string>(currentCampaign?.title || '')

  const [ currentType, setCurrentType ] = useState<string>(currentCampaign?.token_standard || 'ERC20')

  const types = [
    { value: 'ERC20', label: 'ERC20' },
    { value: 'ERC721', label: 'ERC721' },
    { value: 'ERC1155', label: 'ERC1155' }
  ]

  useEffect(() => {
    clearCampaign()
  }, [])

  useEffect(() => {
    if (!tokenAddress.length || !chainId) { return }
    console.log('here', tokenAddress)
    setTokenContractData(provider, tokenAddress, currentType as TTokenType, address, chainId)
  }, [tokenAddress, provider])

  const defineIfNextDisabled = () => {
    return !title || !tokenAddress || !symbol || loading
  }
  
  return <Container>
    <WidgetComponent title='Campaign setup'>
      <WidgetSubtitle>Fill in all fields to continue to the next step</WidgetSubtitle>
      <InputStyled
        value={title}
        disabled={Boolean(currentCampaign)}
        onChange={(value: string) => {
          setTitle(value)
          return value
        }}
        title='Title of campaign'
      />

      <StyledRadio
        label='Token Standard'
        disabled={Boolean(currentCampaign)}
        value={currentType}
        radios={types}
        onChange={(value) => { setCurrentType(value) }}
      />

      <InputStyled
        value={tokenAddress}
        placeholder='0x Address'
        disabled={Boolean(currentCampaign)}
        onChange={(value: string) => {
          setTokenAddress(value)
          return value
        }}
        title='Token Address'
      />
    </WidgetComponent>

    <Aside
      next={{
        action: () => {
          setInitialData(
            currentType as TTokenType,
            title,
            () => {
              if (currentCampaign) {
                return history.push(`/campaigns/edit/${currentType}/${currentCampaign.campaign_id}/initial`)
              }
              history.push(`/campaigns/new/${currentType}/initial`)
            }
          )
        },
        loading,
        disabled: defineIfNextDisabled()
      }}
      title="Summary"
      subtitle="Check and confirm details"
    >
      <AsideContent>
        {title && <AsideRow>
          <AsideText>Title of campaign</AsideText>
          <AsideValueShorten>{title}</AsideValueShorten>
        </AsideRow>}

        <AsideRow>
          <AsideText>Token Standard</AsideText>
          <AsideValue>{currentType}</AsideValue>
        </AsideRow>

        <AsideRow>
          <AsideText>Network</AsideText>
          <AsideValue>{defineNetworkName(chainId)}</AsideValue>
        </AsideRow>
      </AsideContent>
    </Aside>
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(CampaignsCreateNew)