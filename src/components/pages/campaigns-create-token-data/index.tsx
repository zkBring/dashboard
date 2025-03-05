import { FC, useState, useEffect } from 'react'
import {
  InputStyled,
  SelectStyled,
  SplitInputs,
  TokenBalance,
  TokenBalanceValue,
  Subtitle,
  WidgetComponentStyled,
  SwitcherStyled
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
import Icons from 'icons'

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
    setTokenData: (
      tokenStandard: TTokenType,
      totalClaims: string,
      tokensPerClaim: string,
      callback?: () => void
    ) => dispatch(
      campaignAsyncActions.setTokenData(
        tokenStandard,
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

const CampaignsTokenData: FC<ReduxType> = ({
  symbol: appliedTokenSymbol,
  chainId,
  address,
  symbol,
  campaigns,
  setTokenContractData,
  setTokenData,
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
  const currentCampaignType = campaign ? campaign.token_standard : 'ERC20'
  
  const [
    tokenAddress,
    setTokenAddress
  ] = useState<string>(currentTokenAddress)
  
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
    return !tokenAddress ||
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

  const [
    currentSwitcherValue,
    setCurrentSwitcherValue
  ] = useState<string>('tokens')

  const selectCurrentPlaceholder = () => {
    if (!tokenAddress) {
      return 'Choose token address'
    }
    const selectValue = selectCurrentValue()
    if (!selectValue) { return tokenAddress }
    return selectValue.label
  }

  console.log({
    loading
  })
  
  return <>
    <Container>
      <Aside>
        <Breadcrumbs
          items={
            [
              {
                title: 'Audience'
              }, {
                title: 'Token',
                status: 'current'
              }, {
                title: 'Drop'
              }, {
                title: 'Launch'
              }
            ]
          }
        />
      </Aside>
  
      <WidgetComponentStyled title='What are you dropping?'>
        <SwitcherStyled
          active={currentSwitcherValue}
          options={[
            {
              title: 'Tokens (ERC20)',
              id: 'tokens'
            },
            {
              title: 'Soulbound NFT',
              id: 'nfts',
              disabled: true
            }
          ]}
          disabled={loading || userLoading}
          onChange={(id) => {
            
          }}
        />
        <Subtitle>
          Token contract address
          <TokenBalance>
            Token balance: {tokenAmount ? <Tooltip text={`${tokenAmountFormatted} ${symbol}`}><TokenBalanceValue>{tokenAmountFormatted}</TokenBalanceValue> {symbol}</Tooltip> : '0'}
          </TokenBalance>
        </Subtitle>
        <SelectStyled
          disabled={Boolean(campaign) || loading || userLoading}
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
        

        <SplitInputs>
          <InputStyled
            value={totalClaims}
            disabled={Boolean(campaign) || loading}
            placeholder='0'
            onChange={(value: string) => {
              setTotalClaims(value)
              return value
            }}
            icon={<Icons.InputProfileIcon />}

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
            icon={<Icons.InputCoinIcon />}

            note='Define how many total claims are allowed for this drop.'
          />
        </SplitInputs>
        <Button
          appearance='action'
          disabled={defineIfNextDisabled()}
          onClick={() => {
            setTokenData(
              currentType as TTokenType,
              totalClaims,
              tokensPerClaim,
              () => {
                history.push(`/campaigns/new/ERC20/campaign-data`)
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
export default connect(mapStateToProps, mapDispatcherToProps)(CampaignsTokenData)