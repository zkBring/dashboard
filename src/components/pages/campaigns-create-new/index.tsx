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
import { TTokenType, TLinkParams, TAlchemyContract } from 'types'
import { useHistory } from 'react-router-dom'
import * as campaignActions from 'data/store/reducers/campaign/actions'
import { CampaignActions } from 'data/store/reducers/campaign/types'
import { Dispatch } from 'redux'
import { defineNetworkName, shortenString, defineTokenType, defineIfUserOwnsContract } from 'helpers'
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
    contracts,
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
  contracts
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
    getContracts: () => {
      dispatch(
        userAsyncActions.getContracts()
      )
    }
  }
}

const defineContractsOptions = (contracts: TAlchemyContract[]) => {
  const options = contracts.map(contract => {
    return {
      label: `${contract.name} ${shortenString(contract.address)} (${contract.totalBalance} owned)`,
      value: contract
    }
  })
  return options
}

type ReduxType = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatcherToProps>

const CampaignsCreateNew: FC<ReduxType> = ({
  symbol: appliedTokenSymbol,
  chainId,
  provider,
  address,
  campaigns,
  setTokenContractData,
  setInitialData,
  clearCampaign,
  loading,
  getContracts,
  contracts,
  userLoading,
  tokenAddress: appliedTokenAddress
}) => {

  const history = useHistory()
  const { id } = useParams<TLinkParams>()

  const campaign = id ? campaigns.find(campaign => campaign.campaign_id === id) : null
  const currentTokenAddress = campaign ? campaign.token_address : ''
  const currentTokenAddressToShow = currentTokenAddress || appliedTokenAddress
  const currentCampaignType = campaign ? campaign.token_standard : null
  const currentCampaignTitle = campaign ? campaign.title : ''
  const currentTokenSymbol = campaign ? campaign.symbol : ''
  const currentTokenSymbolToShow = currentTokenSymbol || appliedTokenSymbol
  
  const [
    tokenAddress,
    setTokenAddress
  ] = useState<string>(currentTokenAddress)
  

  const [
    title,
    setTitle
  ] = useState<string>(currentCampaignTitle)

  const [ currentType, setCurrentType ] = useState<string | null>(currentCampaignType)
  const [ currentSwitcherValue, setCurrentSwitcherValue ] = useState<string>(currentCampaignType === 'ERC1155' || currentCampaignType === 'ERC721' || !currentCampaignType ? 'nfts' : 'tokens')

  useEffect(() => {
    clearCampaign()
  }, [])

  useEffect(() => {
    getContracts()
  }, [])

  useEffect(() => {
    if (!tokenAddress.length || !chainId) { return }
    setTokenContractData(provider, tokenAddress, currentType as TTokenType, address, chainId)
  }, [tokenAddress, provider, currentType])

  const defineIfNextDisabled = () => {
    return !title || !tokenAddress || !appliedTokenSymbol || loading
  }

  const selectTokenOptions = defineContractsOptions(contracts)

  const selectCurrentValue = () => {
    const currentOption = selectTokenOptions.find(option => option.value.address === tokenAddress)
    if (!currentOption) {
      return null
    }
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
          disabled={Boolean(campaign) || loading}
          placeholder='Enter title'
          onChange={(value: string) => {
            setTitle(value)
            return value
          }}
          title='Title of the campaign'
        />

        <SwitcherStyled
          title='Contract'
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
          disabled={Boolean(campaign) || loading || userLoading}
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
          disabled={Boolean(campaign) || loading || userLoading}
          onChange={async ({ value }: { value: TAlchemyContract | string}) => {
            if (typeof value === 'string') {
              const tokenType = await defineTokenType(value, provider)
              if (tokenType !== null && chainId) {
                const tokenOwnership = await defineIfUserOwnsContract(address, value, chainId)
                if (!tokenOwnership) {
                  return alert('You dont have tokens of provided contract')
                }
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
          disabled={Boolean(campaign) || loading}
          onChange={(value: string) => {
            setTokenAddress(value)
            return value
          }}
        />}
      </WidgetComponent>

      <Aside
        next={{
          action: () => {
            setInitialData(
              currentType as TTokenType,
              title,
              () => {
                if (campaign) {
                  return history.push(`/campaigns/edit/${currentType}/${campaign.campaign_id}/initial`)
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

          {(currentTokenAddress || appliedTokenAddress) && <TableRow>
            <TableText>Token address</TableText>
            <TableValue>{shortenString(String(currentTokenAddressToShow))}</TableValue>
          </TableRow>}

          {(currentTokenSymbol || appliedTokenSymbol) && <TableRow>
            <TableText>Collection</TableText>
            <TableValue>{currentTokenSymbol || appliedTokenSymbol}</TableValue>
          </TableRow>}

          {currentType && <TableRow>
            <TableText>Token standard</TableText>
            <TableValue>{currentType}</TableValue>
          </TableRow>}

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