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
  checkERC721AssetsData,
  defineAssetsTextareaPlaceholder,
  defineNativeTokenSymbol,
  parseERC721AssetsData
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

const mapDispatcherToProps = (dispatch: IAppDispatch) => {
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
      callback: () => void
    ) => campaignAsyncActions.setAssetsData(
      dispatch,
      type,
      assets,
      String(wallet.value),
      callback
    ),
    clearCampaign: () => {
      campaignActions.clearCampaign()
    }
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatcherToProps> &
  TProps

const Erc721: FC<ReduxType > = ({
  provider,
  symbol,
  setTokenContractData,
  setAssetsData,
  chainId,
  address,
  nativeTokenAmountFormatted,
  tokenAmountFormatted,
  clearCampaign,
  campaign
}) => {
  const [
    tokenAddress,
    setTokenAddress
  ] = useState(campaign ? campaign.tokenAddress : '')

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
    if (!assetsValue ) { return }
    let assets = parseERC721AssetsData(assetsValue)
    if (!assets) { return }
    setAssetsParsedValue(assets)
  }, [assetsValue])

  const defineIfButtonDisabled = () => {
    if (tokenAddress.length !== 42) { return true }
    return !checkERC721AssetsData(assetsValue)
  }

  const history = useHistory()

  const nativeTokenSymbol = defineNativeTokenSymbol({ chainId })

  return <Container>
    <WidgetContent>
      <WidgetOptions>
        <InputTokenAddress
          value={tokenAddress}
          placeholder='0x Address'
          disabled={Boolean(campaign)}
          onChange={value => {
            setTokenAddress(value)
            return value
          }}
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
            'erc721',
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
              'erc721',
              assetsParsed,
              currentWallet,
              () => {
                if (campaign) {
                  return history.push(`/campaigns/edit/${type}/${campaign.id}/approve`)
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

export default connect(mapStateToProps, mapDispatcherToProps)(Erc721)
