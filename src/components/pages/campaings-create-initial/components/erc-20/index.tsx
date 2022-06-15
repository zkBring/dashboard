import { FC, useState, useEffect, useMemo } from 'react'
import {
  Container,
  WidgetContent,
  WidgetOptions,
  WidgetTextarea,
  WidgetButton,
} from '../../styled-components'
import wallets from 'configs/wallets'
import Aside from '../aside'
import { TProps } from './type'
import {
  NATIVE_TOKEN_ADDRESS
} from 'configs/app'
import {
  checkERC20AssetsData,
  parseERC20AssetsData,
  checkNativeAssetsData,
  parseNativeAssetsData,
  defineAssetsTextareaPlaceholder,
  defineNativeTokenSymbol
} from 'helpers'
import {
  UserAssets,
  UserAsset,
  UserAssetNative,
  InputTokenAddress,
  SelectComponent
} from './styled-components'
import { RootState, IAppDispatch } from 'data/store';
import { connect } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { TTokenType, TAssetsData, TSelectOption } from 'types'
import * as campaignAsyncActions from 'data/store/reducers/campaign/async-actions'
import * as campaignActions from 'data/store/reducers/campaign/actions'
import { CampaignActions } from 'data/store/reducers/campaign/types'
import { Dispatch } from 'redux'

const mapStateToProps = ({
  user: {
    address,
    provider,
    chainId,
    nativeTokenAmountFormatted,
    tokenAmountFormatted,
    loading: userLoading
  },
  campaign: {
    loading,
    decimals,
    symbol
  }
}: RootState) => ({
  loading,
  address,
  provider,
  decimals,
  chainId,
  symbol,
  nativeTokenAmountFormatted,
  tokenAmountFormatted,
  userLoading
})

const mapDispatcherToProps = (dispatch: IAppDispatch & Dispatch<CampaignActions>) => {
  return {
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
    setAssetsData: (
      type: TTokenType,
      assets: TAssetsData,
      wallet: TSelectOption,
      title: string,
      callback: () => void
    ) => campaignAsyncActions.setAssetsData(
      dispatch,
      type,
      assets,
      String(wallet.value),
      title,
      callback
    ),
    clearCampaign: () => {
      dispatch(
        campaignActions.clearCampaign()
      )
    }
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatcherToProps> &
  TProps

const Erc20: FC<ReduxType > = ({
  provider,
  symbol,
  setTokenContractData,
  setAssetsData,
  chainId,
  address,
  nativeTokenAmountFormatted,
  tokenAmountFormatted,
  clearCampaign,
  decimals,
  userLoading,
  campaign
}) => {
  const [
    tokenAddress,
    setTokenAddress
  ] = useState(campaign ? campaign.token_address : '')

  const [
    title,
    setTitle
  ] = useState(campaign ? campaign.title : '')

  useEffect(() => {
    clearCampaign()
  }, [])
  
  const walletsOptions = useMemo(() => {
    const options = wallets
      .filter(wallet => {
        return chainId && wallet.chains.includes(String(chainId))
      })
      .map(wallet => ({
        label: wallet.name,
        value: wallet.id
      }))
    return options
  }, [chainId])

  const [
    currentWallet,
    setCurrentWallet
  ] = useState<TSelectOption>(walletsOptions[0])

  const { type } = useParams<{ type: TTokenType }>()

  const [
    assetsValue,
    setAssetsValue
  ] = useState('')

  const [
    assetsParsed,
    setAssetsParsedValue
  ] = useState<TAssetsData>([])

  useEffect(() => {
    if (!tokenAddress.length || !chainId) { return }
    setTokenContractData(provider, tokenAddress, type, address, chainId)
  }, [tokenAddress, provider])

  useEffect(() => {
    if (!assetsValue || !decimals) { return }
    let assets
    if (tokenAddress !== NATIVE_TOKEN_ADDRESS) {
      assets = parseERC20AssetsData(assetsValue, decimals)
    } else {
      assets = parseNativeAssetsData(assetsValue, decimals)
    }
    if (!assets) { return }
    
    setAssetsParsedValue(assets)
  }, [assetsValue])

  const defineIfButtonDisabled = () => {
    if (tokenAddress.length !== 42) { return true }
    if (tokenAddress !== NATIVE_TOKEN_ADDRESS) {
      return !checkERC20AssetsData(assetsValue)
    }
    if (tokenAddress === NATIVE_TOKEN_ADDRESS) {
      return !checkNativeAssetsData(assetsValue)
    }
  }

  const history = useHistory()

  const nativeTokenSymbol = defineNativeTokenSymbol({ chainId })

  return <Container>
    <WidgetContent>
      <WidgetOptions>
        <InputTokenAddress
          value={title}
          onChange={value => {
            setTitle(value)
            return value
          }}
          disabled={Boolean(campaign)}
          title='Title of campaign'
        />

        <InputTokenAddress
          value={tokenAddress}
          placeholder='0x Address'
          onChange={value => {
            setTokenAddress(value)
            return value
          }}
          disabled={Boolean(campaign)}
          title='Contract Address'
        />
        <UserAssets>
          <UserAssetNative>
            Balance: {nativeTokenAmountFormatted} {nativeTokenSymbol}
          </UserAssetNative>
          {symbol && symbol !== nativeTokenSymbol && tokenAmountFormatted && <UserAsset>
            Balance {symbol}: {tokenAmountFormatted}
          </UserAsset>}
        </UserAssets>
        <WidgetTextarea
          value={assetsValue}
          placeholder={defineAssetsTextareaPlaceholder(
            'ERC20',
            Boolean(symbol),
            tokenAddress,
            nativeTokenSymbol
          )}
          disabled={!symbol}
          onChange={value => {
            setAssetsValue(value)
            return value
          }}
        />
        <SelectComponent
          options={walletsOptions}
          value={currentWallet}
          onChange={value => setCurrentWallet(value)}
          placeholder='Choose wallet'
        />
        <WidgetButton
          title='Next'
          appearance='action'
          onClick={() => {
            setAssetsData(
              'ERC20',
              assetsParsed,
              currentWallet,
              title,
              () => {
                if (tokenAddress === NATIVE_TOKEN_ADDRESS) {
                  if (campaign) {
                    return history.push(`/campaigns/edit/${type}/${campaign.campaign_id}/secure`)
                  }
                  return history.push(`/campaigns/new/${type}/secure`)
                }
                if (campaign) {
                  return history.push(`/campaigns/edit/${type}/${campaign.campaign_id}/approve`)
                }
                history.push(`/campaigns/new/${type}/approve`)
              }
            )
          }}
          disabled={defineIfButtonDisabled()}
        />
      </WidgetOptions>
      {chainId && <Aside
        symbol={symbol}
        type={type}
        assets={assetsParsed}
        chainId={chainId}
      />}
    </WidgetContent>      
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(Erc20)
