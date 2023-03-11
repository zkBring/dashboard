import { FC, useState, useEffect } from 'react'
import {
  InputStyled,
  SwitcherStyled,
  SelectStyled
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
import { RootState, IAppDispatch } from 'data/store'
import { connect } from 'react-redux'
import * as campaignAsyncActions from 'data/store/reducers/campaign/async-actions'
import { TTokenType, TLinkParams, TOwnedTokens, TOwnedToken } from 'types'
import { useHistory } from 'react-router-dom'
import * as campaignActions from 'data/store/reducers/campaign/actions'
import { CampaignActions } from 'data/store/reducers/campaign/types'
import { Dispatch } from 'redux'
import { defineNetworkName, shortenString, defineTokenType } from 'helpers'
import * as userAsyncActions from 'data/store/reducers/user/async-actions'

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
    address,
    nftTokens,
    loading: userLoading
  }
}: RootState) => ({
  tokenStandard,
  loading,
  campaigns,
  chainId,
  userLoading,
  provider,
  address,
  symbol,
  title,
  tokenAddress,
  nftTokens
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
    },
    getNFTTokens: () => {
      dispatch(
        userAsyncActions.getNFTTokens()
      )
    }
  }
}

const defineNFTTokensOptions = (nftTokens: TOwnedTokens) => {
  const tokens = Object.entries(nftTokens)
  const options = tokens.map(([ address, asset ]) => {
    return {
      label: `${asset.name} ${shortenString(address)} (${asset.tokens.length} token(s) owned)`,
      value: asset
    }
  })
  return options
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
  loading,
  getNFTTokens,
  nftTokens,
  userLoading
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

  const [ currentType, setCurrentType ] = useState<string | null>(currentCampaign?.token_standard || 'ERC721')
  const [ currentSwitcherValue, setCurrentSwitcherValue ] = useState<string>(currentCampaign?.token_standard === 'ERC1155' || currentCampaign?.token_standard === 'ERC721' || !currentCampaign?.token_standard ? 'nfts' : 'tokens')

  useEffect(() => {
    clearCampaign()
  }, [])

  useEffect(() => {
    getNFTTokens()
  }, [])

  useEffect(() => {
    if (!tokenAddress.length || !chainId) { return }
    setTokenContractData(provider, tokenAddress, currentType as TTokenType, address, chainId)
  }, [tokenAddress, provider, currentType])

  const defineIfNextDisabled = () => {
    return !title || !tokenAddress || !symbol || loading
  }

  const selectTokenOptions = defineNFTTokensOptions(nftTokens)

  const selectCurrentValue = () => {
    const currentOption = selectTokenOptions.find(option => option.value.address === tokenAddress)
    if (currentOption) {
      return currentOption
    }
  }

  const selectCurrentPlaceholder = () => {
    if (!tokenAddress) {
      return 'Select Token'
    }
    const selectValue = selectCurrentValue()
    if (!selectValue) { return tokenAddress }
    return selectValue.label
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
              title: 'NFTs (ERC721/ERC1155)',
              id: 'nfts'
            },
            {
              title: 'Tokens (ERC20)',
              id: 'tokens'
            }
          ]}
          disabled={Boolean(currentCampaign) || loading || userLoading}
          active={currentSwitcherValue}
          onChange={(id) => {
            setTokenAddress('')
            setCurrentSwitcherValue(id)
            if (id === 'tokens') {
              setCurrentType('ERC20')
            } else {
              setCurrentType(null)
            }
          }}
        />

        {currentSwitcherValue === 'nfts' && <SelectStyled
          disabled={Boolean(currentCampaign) || loading || userLoading}
          onChange={async ({ value }: { value: TOwnedToken | string}) => {
            if (typeof value === 'string') {
              const tokenType = await defineTokenType(value, provider)
              if (tokenType !== null) {
                setCurrentType(tokenType)
                setTokenAddress(value)
              } else {
                alert('Token was not detected among ERC721 and ERC1155 tokens')
              }
            } else {
              setCurrentType(String(value.tokenType))
              setTokenAddress(String(value.address))
            }
          }}
          placeholder={selectCurrentPlaceholder()}
          value={selectCurrentValue()}
          options={selectTokenOptions}
          notFoundActiveCondition={(value) => {
            // return false
            return value.startsWith('0x') && value.length === 42
          }}
        />}

        {currentSwitcherValue === 'tokens' && <InputStyled
          value={tokenAddress}
          placeholder='0x... address'
          note='Carefully check address before you go'
          disabled={Boolean(currentCampaign) || loading}
          onChange={(value: string) => {
            setTokenAddress(value)
            return value
          }}
          title='Token Address'
        />}
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