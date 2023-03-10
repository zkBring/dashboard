import { FC, useState, useEffect } from 'react'
import {
  StyledRadio,
  InputStyled,
  SwitcherStyled
} from './styled-components'
import { useParams } from 'react-router-dom'

import {
  WidgetComponent,
  Container,
  Aside,
  WidgetSubtitle,
  TableRow,
  TableText,
  TableValue,
  AsideContent,
  TableValueShorten
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

const mapDispatcherToProps = (dispatch: IAppDispatch & Dispatch<CampaignActions>) => {
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
  }, [tokenAddress, provider, currentType])

  const defineIfNextDisabled = () => {
    return !title || !tokenAddress || !symbol || loading
  }
  
  return <>
    <Container>
      <WidgetComponent title='Campaign setup'>
        <WidgetSubtitle>Fill in all fields to continue to the next step</WidgetSubtitle>
        <InputStyled
          value={title}
          disabled={Boolean(currentCampaign) || loading}
          onChange={(value: string) => {
            setTitle(value)
            return value
          }}
          title='Title of the campaign'
        />

        <SwitcherStyled
          options={[
            {
              title: 'NFTs (ERC721 / ERC1155)',
              id: 'nft'
            },
            {
              title: 'NFTs (ERC721 / ERC1155)',
              id: 'ERC20'
            }
          ]}
          active={currentType}
          onChange={(id) => {
            if (id === 'ERC20') {
              setCurrentType('ERC20')
            }
          }}
        />

        <StyledRadio
          label='Token Standard'
          disabled={Boolean(currentCampaign) || loading}
          value={currentType}
          radios={types}
          onChange={(value) => { setCurrentType(value) }}
        />

        <InputStyled
          value={tokenAddress}
          placeholder='0x... address'
          note='Carefully check address before you go'
          disabled={Boolean(currentCampaign) || loading}
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
        back={{
          action: () => {
            history.push(`/campaigns`)
          },
        }}
        title="Summary"
        subtitle="Check and confirm details"
      >
        <AsideContent>
          {title && <TableRow>
            <TableText>Title of campaign</TableText>
            <TableValueShorten>{title}</TableValueShorten>
          </TableRow>}

          <TableRow>
            <TableText>Token Standard</TableText>
            <TableValue>{currentType}</TableValue>
          </TableRow>

          <TableRow>
            <TableText>Network</TableText>
            <TableValue>{defineNetworkName(chainId)}</TableValue>
          </TableRow>
        </AsideContent>
      </Aside>
    </Container>
  </>
}

export default connect(mapStateToProps, mapDispatcherToProps)(CampaignsCreateNew)