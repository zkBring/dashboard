import { FC, useState, useMemo } from 'react'
import { RootState } from 'data/store'
import { connect } from 'react-redux'
import {
  defineNativeTokenSymbol,
  countNativeTokensToSecure
} from 'helpers'
import { useParams } from 'react-router-dom'
import { TLinkParams, TSelectOption } from 'types'
import { utils } from 'ethers'
import {
  WidgetComponent,
  Container,
  Aside,
  WidgetContainer,
  TableRow,
  TableText,
  TableValue,
  AsideContent,
  TableValueShorten,
  AssetsList,
  AsideDivider
} from 'components/pages/common'
import wallets from 'configs/wallets'
import addressSpecificOptions from 'configs/address-specific-options'
import {
  StyledInput,
  StyledSelect
} from './styled-components'
import { IAppDispatch } from 'data/store'
import * as userAsyncActions from 'data/store/reducers/user/async-actions'
import { useHistory } from 'react-router-dom'
import { shortenString, defineNetworkName } from 'helpers'
import { BigNumber } from 'ethers'

const mapStateToProps = ({
  user: {
    chainId,
    comission,
    address
  },
  campaigns: {
    campaigns
  },
  campaign: {
    assets,
    symbol,
    tokenStandard,
    loading,
    title,
    tokenAddress,
    claimPattern,
    assetsOriginal,
    sdk,
    sponsored
  },
}: RootState) => ({
  assets,
  symbol,
  title,
  chainId,
  tokenAddress,
  campaigns,
  tokenStandard,
  loading,
  assetsOriginal,
  claimPattern,
  sdk,
  sponsored,
  comission,
  address
})

const mapDispatcherToProps = (dispatch: IAppDispatch) => {
  return {
    secure: (
      totalNativeTokensAmountToSecure: BigNumber,
      nativeTokensPerLink: string,
      walletApp: string,
      callback: () => void
    ) => {
      dispatch(
        userAsyncActions.secure(totalNativeTokensAmountToSecure, nativeTokensPerLink, walletApp, callback)
      )
    }
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps> 

const CampaignsCreateSecure: FC<ReduxType> = ({
  assets,
  symbol,
  chainId,
  campaigns,
  secure,
  tokenStandard,
  loading,
  tokenAddress,
  title,
  claimPattern,
  assetsOriginal,
  sdk,
  sponsored,
  comission,
  address
}) => {
  
  const walletsOptions = useMemo(() => {
    const options = wallets
      .filter(wallet => {
        if (!chainId) { return false }
        const walletsOnlyAvailableToAddress = addressSpecificOptions[address.toLowerCase()]
        const isAvailableOnCurrentChain = wallet.chains.includes(String(chainId))
        if (!walletsOnlyAvailableToAddress || !walletsOnlyAvailableToAddress.walletApps) {
          return isAvailableOnCurrentChain
        }
        return walletsOnlyAvailableToAddress.walletApps.includes(wallet.id) && isAvailableOnCurrentChain
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
  const history = useHistory()
  const [ nativeTokensAmount, setNativeTokensAmount ] = useState<string>('')
  const { id } = useParams<TLinkParams>()
  if (!assets || !symbol || !chainId) { return null }
  
  const nativeTokenSymbol = defineNativeTokenSymbol({ chainId })
  const currentCampaign = id ? campaigns.find(campaign => campaign.campaign_id === id) : null
  const currentCampaignTitle = currentCampaign ? currentCampaign.title : title
  const currentTokenAddress = currentCampaign ? currentCampaign.token_address : tokenAddress
  const currentCampaignChainId = currentCampaign ? currentCampaign.chain_id : chainId
  const currentCampaignTokenStandard = currentCampaign ? currentCampaign.token_standard : tokenStandard
  const currentCampaignTokenSymbol = currentCampaign ? currentCampaign.symbol : symbol
  const currentCampaignClaimPattern = currentCampaign ? currentCampaign.claim_pattern : claimPattern

  const {
    totalNativeTokensAmount,
    totalComission,
    totalNativeTokensAmountToSecure
  } = countNativeTokensToSecure(
    nativeTokensAmount,
    assets,
    comission,
    sponsored
  )

  return <Container>
    <WidgetContainer>
      <WidgetComponent title={sdk ? 'Additional options' : 'Optional'}>
        {!sdk && <StyledInput
          title={`${nativeTokenSymbol} to include`}
          value={nativeTokensAmount}
          disabled={loading}
          note='This amount of native tokens will be included to each link as a bonus for receiver'
          onChange={value => {
            if (/^[0-9.]+$/.test(value) || value === '') {
              setNativeTokensAmount(value)
            }
            return value
          }}
        />}
        <StyledSelect
          options={walletsOptions}
          disabled={loading || walletsOptions.length <= 1}
          value={currentWallet}
          onChange={value => setCurrentWallet(value)}
          placeholder='Preferred wallet'
          title='Preferred wallet'
          note='User will be suggested to claim with selected wallet by default, but still having other options available'
        />
      </WidgetComponent>

    </WidgetContainer>
      
    <Aside
      back={{
        action: () => {
          history.goBack()
        }
      }}
      next={{
        action: () => {
          const redirectURL = currentCampaign ? `/campaigns/edit/${tokenStandard}/${currentCampaign.campaign_id}/generate` : `/campaigns/new/${tokenStandard}/generate`
          secure(
            totalNativeTokensAmountToSecure,
            nativeTokensAmount,
            String(currentWallet.value),
            () => history.push(redirectURL)
          )
        },
        title: 'Launch campaign',
        disabled: loading,
        loading
      }}
      title="Summary"
      subtitle="Check and confirm details"
    >
      <AsideContent>
        <TableRow>
          <TableText>Title of campaign</TableText>
          <TableValueShorten>{currentCampaignTitle}</TableValueShorten>
        </TableRow>

        {currentTokenAddress && <TableRow>
          <TableText>Token address</TableText>
          <TableValue>{shortenString(currentTokenAddress)}</TableValue>
        </TableRow>}

        {currentCampaignTokenSymbol && <TableRow>
          <TableText>Token Name</TableText>
          <TableValue>{currentCampaignTokenSymbol}</TableValue>
        </TableRow>}

        {currentCampaignTokenStandard && <TableRow>
          <TableText>Token standard</TableText>
          <TableValue>{currentCampaignTokenStandard}</TableValue>
        </TableRow>}

        {currentCampaignChainId && <TableRow>
          <TableText>Network</TableText>
          <TableValue>{defineNetworkName(Number(currentCampaignChainId))}</TableValue>
        </TableRow>}

        {!sdk && currentCampaignTokenStandard && assetsOriginal && <AssetsList
          data={assetsOriginal}
          claimPattern={currentCampaignClaimPattern}
          type={currentCampaignTokenStandard}
        />}

        {!sdk && assets && <TableRow>
          <TableText>Total links</TableText>
          <TableValue>{assets.length}</TableValue>
        </TableRow>}

        <TableRow>
          <TableText>Claim pattern</TableText>
          <TableValue>{currentCampaignClaimPattern}</TableValue>
        </TableRow>

        {!sdk && <>
          <AsideDivider />

          <TableRow>
            <TableText>To be secured (sponsorship)</TableText>
            <TableValue>{String(utils.formatUnits(totalComission, 18))} {nativeTokenSymbol}</TableValue>
          </TableRow>

          <TableRow>
            <TableText>Included into the links</TableText>
            <TableValue>{String(utils.formatUnits(totalNativeTokensAmount, 18))} {nativeTokenSymbol}</TableValue>
          </TableRow>

          <AsideDivider />

          <TableRow>
            <TableText>Total amount</TableText>
            <TableValue>{String(utils.formatUnits(totalNativeTokensAmountToSecure, 18))} {nativeTokenSymbol}</TableValue>
          </TableRow>
        </>}


      </AsideContent>
    </Aside>
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(CampaignsCreateSecure)