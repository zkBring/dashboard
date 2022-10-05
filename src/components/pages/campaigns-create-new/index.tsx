import { FC, useState, useEffect } from 'react'
import {
  StyledRadio,
  InputStyled
} from './styled-components'

import {
  WidgetComponent,
  Container,
  Aside,
  WidgetSubtitle
} from 'components/pages/common'

import { RootState, IAppDispatch } from 'data/store';
import { connect } from 'react-redux'
import * as campaignAsyncActions from 'data/store/reducers/campaign/async-actions'
import { TTokenType } from 'types'
import { useHistory } from 'react-router-dom'
import * as campaignActions from 'data/store/reducers/campaign/actions'
import { CampaignActions } from 'data/store/reducers/campaign/types'
import { Dispatch } from 'redux'

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
    nativeTokenAmountFormatted,
    tokenAmountFormatted,
    loading: userLoading,
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
  setTokenContractData,
  setInitialData,
  title: campaignTitle,
  tokenAddress: campaignTokenAddress,
  clearCampaign
}) => {

  const history = useHistory()

  const [ type, setType ] = useState<string>('erc20')
  const [
    tokenAddress,
    setTokenAddress
  ] = useState<string>(campaignTokenAddress || '')

  const [
    title,
    setTitle
  ] = useState<string>(campaignTitle || '')

  const types = [
    { value: 'erc20', label: 'ERC20' },
    { value: 'erc721', label: 'ERC721' },
    { value: 'erc1155', label: 'ERC1155' }
  ]

  useEffect(() => {
    if (!tokenAddress.length || !chainId) { return }
    setTokenContractData(provider, tokenAddress, type as TTokenType, address, chainId)
  }, [tokenAddress, provider])


  useEffect(() => {
    clearCampaign()
  }, [])


  const defineIfNextDisabled = () => {
    return !title || !tokenAddress || !symbol
  }
  
  return <Container>
    <WidgetComponent title='Campaign setup'>
      <WidgetSubtitle>Fill out all fields to finish setup campaign</WidgetSubtitle>
      <InputStyled
        value={title}
        onChange={(value: string) => {
          setTitle(value)
          return value
        }}
        title='Title of campaign'
      />

      <StyledRadio
        label='Token Standard'
        value={type}
        radios={types}
        onChange={(value) => { setType(value) }}
      />

      <InputStyled
        value={tokenAddress}
        placeholder='0x Address'
        onChange={(value: string) => {
          setTokenAddress(value)
          return value
        }}
        title='Token Address'
      />
    </WidgetComponent>

    <Aside
      back={{
        action: () => {}
      }}
      next={{
        action: () => {
          setInitialData(type as TTokenType, title, () => { history.push(`/campaigns/new/${type}/initial`) })
        },
        disabled: defineIfNextDisabled()
      }}
      title="Title"
      subtitle="Subtitle"
    >
    </Aside>
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(CampaignsCreateNew)