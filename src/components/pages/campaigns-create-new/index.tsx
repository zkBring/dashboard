import { FC, useState, useEffect } from 'react'
import {
  InputStyled,
  SelectStyled,
  SplitInputs,
  TokenBalance,
  TokenBalanceValue,
  WidgetComponentStyled
} from './styled-components'
import { useParams } from 'react-router-dom'
import {
  Container,
  Aside
} from 'components/pages/common'
import {
  Breadcrumbs
} from 'components/common'
import {
  Button,
  Tooltip
} from 'components/common'
import { RootState, IAppDispatch } from 'data/store'
import { connect } from 'react-redux'
import * as campaignAsyncActions from 'data/store/reducers/campaign/async-actions'
import {
  TTokenType,
  TLinkParams,
  TNFTContract,
  TERC20Contract
} from 'types'
import { useHistory } from 'react-router-dom'
import { CampaignActions } from 'data/store/reducers/campaign/types'
import { Dispatch } from 'redux'
import { alertError, preventPageClose } from 'helpers'
import { utils } from 'ethers'
import {
  shortenString,
  defineIfUserOwnsContractERC20
} from 'helpers'
import * as userAsyncActions from 'data/store/reducers/user/async-actions'
import { contractSpecificOptions } from 'configs/contract-specific-options'

const mapStateToProps = ({
  campaign: {
    tokenStandard,
    loading,
    title,
    tokenAddress,
    symbol,
    decimals,
    proxyContractAddress
  },
  campaigns: {
    campaigns
  },
  user: {
    chainId,
    address,
    contractsERC20,
    loading: userLoading,
    signer,
    tokenAmount
  }
}: RootState) => ({
  tokenStandard,
  loading,
  campaigns,
  chainId,
  tokenAmount,
  decimals,
  userLoading,
  address,
  symbol,
  title,
  tokenAddress,
  signer,
  contractsERC20,
  proxyContractAddress
})

const mapDispatcherToProps = (dispatch: IAppDispatch & Dispatch<CampaignActions>) => {
  return {
    setTokenContractData: (
      tokenAddress: string,
      type: TTokenType
    ) => dispatch(campaignAsyncActions.setTokenContractData(
      tokenAddress,
      type,
    )),
    setInitialData: (
      tokenStandard: TTokenType,
      title: string,
      isNewCampaign: boolean,
      totalClaims: string,
      tokensPerClaim: string,
      callback?: () => void
    ) => dispatch(
      campaignAsyncActions.setInitialData(
        tokenStandard,
        title,
        isNewCampaign,
        totalClaims,
        tokensPerClaim,
        callback
      )
    ),
    resetCampaign: (
      campaingId?: string
    ) => {
      dispatch(
        campaignAsyncActions.resetCampaign(campaingId)
      )
    },
    getERC20Contracts: () => {
      dispatch(
        userAsyncActions.getERC20Contracts()
      )
    }
  }
}

const defineContractsOptions = (contractsERC20: TERC20Contract[], tokenType: string | null) => {
  return contractsERC20.map(contract => {
    return {
      label: `${contract.symbol} ${shortenString(contract.address)}`,
      value: contract
    }
  })
}

// @ts-ignore
type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

const CampaignsCreateNew: FC<ReduxType> = ({
  symbol: appliedTokenSymbol,
  chainId,
  address,
  symbol,
  campaigns,
  setTokenContractData,
  setInitialData,
  resetCampaign,
  loading,
  getERC20Contracts,
  userLoading,
  tokenAddress: appliedTokenAddress,
  contractsERC20,
  decimals,
  tokenAmount,
  signer,
  proxyContractAddress
}) => {
  const history = useHistory()
  const { id } = useParams<TLinkParams>()

  useEffect(preventPageClose(), [])

  const campaign = id ? campaigns.find(campaign => campaign.campaign_id === id) : null
  const currentTokenAddress = campaign ? campaign.token_address : ''
  const currentTokenAddressToShow = currentTokenAddress || appliedTokenAddress
  const currentCampaignType = campaign ? campaign.token_standard : 'ERC20'
  const currentCampaignTitle = campaign ? campaign.title : ''
  const currentTokenSymbol = campaign ? campaign.symbol : ''
  
  const [
    tokenAddress,
    setTokenAddress
  ] = useState<string>(currentTokenAddress)
  
  const [
    title,
    setTitle
  ] = useState<string>(currentCampaignTitle)

  const [
    currentType,
    setCurrentType
  ] = useState<string | null>(currentCampaignType || 'ERC20')

  const [
    totalClaims,
    setTotalClaims
  ] = useState<string>('0')

  const [
    tokensPerClaim,
    setTokensPerClaim
  ] = useState<string>('0')

  useEffect(() => {
    resetCampaign(campaign?.campaign_number)
  }, [])


  useEffect(() => {
    return getERC20Contracts()
  }, [])

  useEffect(() => {
    if (!tokenAddress.length) { return }
    setTokenContractData(tokenAddress, currentType as TTokenType)
  }, [tokenAddress, currentType])

  const defineIfNextDisabled = () => {
    return !title ||
           !tokenAddress ||
           !appliedTokenSymbol ||
           loading ||
           !proxyContractAddress ||
           !totalClaims ||
           !tokensPerClaim ||
           totalClaims === '0' ||
           tokensPerClaim === '0'
           
  }

  const selectTokenOptions: any[] = defineContractsOptions(
    contractsERC20,
    currentType
  )

  const tokenAmountFormatted = (tokenAmount && decimals !== null) ? utils.formatUnits(tokenAmount, decimals) : '0'

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
      return 'Choose token address'
    }
    const selectValue = selectCurrentValue()
    if (!selectValue) { return tokenAddress }
    return selectValue.label
  }
  
  return <>
    <Container>
      <Aside>
        <Breadcrumbs
          items={
            [
              {
                title: 'Token',
                status: 'current'
              }, {
                title: 'Audience'
              }, {
                title: 'Launch'
              }
            ]
        }
        />
      </Aside>
  
      <WidgetComponentStyled title='What are you dropping?'>
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

        <SelectStyled
          disabled={Boolean(campaign) || loading || userLoading}
          title="Token name or address"
          onChange={async ({ value }: { value: TNFTContract | string}) => {
            if (typeof value === 'string') {
              if (currentType === 'ERC20' && chainId) {
                const tokenOwnership = await defineIfUserOwnsContractERC20(address, value, signer)
                if (!tokenOwnership) {
                  return alertError('No tokens of provided contract found')
                }
                setTokenAddress(value)
              } else {
                alertError('No chainId provided')
              }
            } else {
              const contractAddress = String(value.address).toLowerCase()
              const contractSpecificOption = contractSpecificOptions[contractAddress]
              if (contractSpecificOption) {
                setCurrentType(contractSpecificOption.tokenType)
                setTokenAddress(contractAddress)
                return 
              }
  
              const tokenType = String(value.tokenType)

              if (tokenType === 'UNKNOWN') {
                return alertError('Token type is UNKNOWN. Unable to select')
              }
              setCurrentType(tokenType)
              setTokenAddress(contractAddress)
            }
          }}
          placeholder={selectCurrentPlaceholder()}
          value={selectCurrentValue()}
          options={selectTokenOptions}
          notFoundActiveCondition={(value) => {
            return value.startsWith('0x') && value.length === 42
          }}
        />
        <TokenBalance>
          Token balance: {tokenAmount ? <Tooltip text={`${tokenAmountFormatted} ${symbol}`}><TokenBalanceValue>{tokenAmountFormatted}</TokenBalanceValue> {symbol}</Tooltip> : '0'}
        </TokenBalance>

        <SplitInputs>
          <InputStyled
            value={totalClaims}
            disabled={Boolean(campaign) || loading}
            placeholder='0'
            onChange={(value: string) => {
              setTotalClaims(value)
              return value
            }}
            title='Total claims'
            note='Set the amount of tokens each user will receive.'
          />

          <InputStyled
            value={tokensPerClaim}
            disabled={Boolean(campaign) || loading}
            placeholder='0'
            onChange={(value: string) => {
              setTokensPerClaim(value)
              return value
            }}
            title='Tokens per claim'
            note='Define how many total claims are allowed for this drop.'
          />
        </SplitInputs>
        <Button
          appearance='action'
          disabled={defineIfNextDisabled()}
          onClick={() => {
            setInitialData(
              currentType as TTokenType,
              title,
              !Boolean(id),
              totalClaims,
              tokensPerClaim,
              () => {
                if (campaign) {
                  return history.push(`/campaigns/edit/${currentType}/${campaign.campaign_id}/initial`)
                }
                history.push(`/campaigns/new/${currentType}/initial`)
              }
            )
          }}
        >
          Next
        </Button>
      </WidgetComponentStyled>
    </Container>
  </>
}

// @ts-ignore
export default connect(mapStateToProps, mapDispatcherToProps)(CampaignsCreateNew)