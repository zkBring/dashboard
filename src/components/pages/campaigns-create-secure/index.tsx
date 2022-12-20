import { FC, useState, useMemo } from 'react'
import { RootState } from 'data/store'
import { connect } from 'react-redux'
import {
  defineNativeTokenSymbol
} from 'helpers'
import { LINK_COMISSION_PRICE } from 'configs/app'
import { add, bignumber, multiply, number } from 'mathjs'
import { useParams } from 'react-router-dom'
import { TLinkParams, TSelectOption } from 'types'
import {
  WidgetComponent,
  Container,
  Aside,
  WidgetContainer,
  WidgetSubtitle,
  AsideRow,
  AsideText,
  AsideValue,
  AsideContent,
  AsideValueShorten,
  AssetsList,
  AsideDivider
} from 'components/pages/common'
import wallets from 'configs/wallets'
import {
  StyledRadio,
  StyledInput,
  StyledSelect
} from './styled-components'
import { IAppDispatch } from 'data/store'
import * as userAsyncActions from 'data/store/reducers/user/async-actions'
import { useHistory } from 'react-router-dom'
import { shortenString, defineNetworkName } from 'helpers'

const mapStateToProps = ({
  user: {
    chainId
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
    assetsOriginal
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
  claimPattern
})

const mapDispatcherToProps = (dispatch: IAppDispatch) => {
  return {
    secure: (
      sponsored: boolean,
      totalNativeTokensAmountToSecure: string,
      nativeTokensPerLink: string,
      walletApp: string,
      callback: () => void
    ) => {
      dispatch(
        userAsyncActions.secure(sponsored, totalNativeTokensAmountToSecure, nativeTokensPerLink, walletApp, callback)
      )
    }
  }
}

const isSponsored = [
  { value: true, label: 'Sponsor claim transactions (users can claim tokens without having MATIC)' },
  { value: false, label: 'No sponsoring (users pay gas to claim tokens)' }
]

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
  assetsOriginal
}) => {
  
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
  const [ sponsored, setSponsored ] = useState<boolean>(true)
  const history = useHistory()
  const [ nativeTokensAmount, setNativeTokensAmount ] = useState<string>('')
  const { id } = useParams<TLinkParams>()
  if (!assets || !symbol || !chainId) { return null }
  
  const nativeTokenSymbol = defineNativeTokenSymbol({ chainId })
  const comission = bignumber(String(LINK_COMISSION_PRICE))

  const currentCampaign = id ? campaigns.find(campaign => campaign.campaign_id === id) : null
  const currentCampaignTitle = currentCampaign ? currentCampaign.title : title
  const currentTokenAddress = currentCampaign ? currentCampaign.token_address : tokenAddress
  const currentCampaignChainId = currentCampaign ? currentCampaign.chain_id : chainId
  const currentCampaignTokenStandard = currentCampaign ? currentCampaign.token_standard : tokenStandard
  const currentCampaignClaimPattern = currentCampaign ? currentCampaign.claim_pattern : claimPattern

  const totalNativeTokensAmount = nativeTokensAmount === '' || nativeTokensAmount === '0' ? 0 : multiply(
    bignumber(nativeTokensAmount),
    assets.length
  )

  const totalComission = sponsored ? multiply(
    comission,
    assets.length
  ) : 0

  const totalNativeTokensAmountToSecure = !sponsored ? totalNativeTokensAmount : add(
    totalNativeTokensAmount,
    totalComission
  )

  return <Container>
    <WidgetContainer>
      <WidgetComponent title='Transaction sponsorship'>
        <WidgetSubtitle>Select to secure tokens to sponsor claim transactions, so users can claim tokens without having {nativeTokenSymbol} in their wallets. </WidgetSubtitle>
        <StyledRadio
          disabled={Boolean(currentCampaign) || loading}
          radios={isSponsored}
          value={sponsored}
          onChange={value => {
            setSponsored(value)
          }}
        />
      </WidgetComponent>

      <WidgetComponent title='Optional'>
        <StyledInput
          title={`${nativeTokenSymbol} to include`}
          value={nativeTokensAmount}
          disabled={loading}
          onChange={value => {
            if (/^[0-9.]+$/.test(value) || value === '') {
              setNativeTokensAmount(value)
            }
            return value
          }}
        />
        <StyledSelect
          options={walletsOptions}
          disabled={loading}
          value={currentWallet}
          onChange={value => setCurrentWallet(value)}
          placeholder='Preferred wallet'
          title='Preferred wallet'
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
            sponsored,
            String(totalNativeTokensAmountToSecure),
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
        <AsideRow>
          <AsideText>Title of campaign</AsideText>
          <AsideValueShorten>{currentCampaignTitle}</AsideValueShorten>
        </AsideRow>

        {currentTokenAddress && <AsideRow>
          <AsideText>Token address</AsideText>
          <AsideValue>{shortenString(currentTokenAddress)}</AsideValue>
        </AsideRow>}

        <AsideRow>
          <AsideText>Token Name</AsideText>
          <AsideValue>Coming soon</AsideValue>
        </AsideRow>

        {currentCampaignTokenStandard && <AsideRow>
          <AsideText>Token standard</AsideText>
          <AsideValue>{currentCampaignTokenStandard}</AsideValue>
        </AsideRow>}

        {currentCampaignChainId && <AsideRow>
          <AsideText>Network</AsideText>
          <AsideValue>{defineNetworkName(Number(currentCampaignChainId))}</AsideValue>
        </AsideRow>}

        {currentCampaignTokenStandard && assetsOriginal && <AssetsList data={assetsOriginal} type={currentCampaignTokenStandard} />}

        {assets && <AsideRow>
          <AsideText>Total links</AsideText>
          <AsideValue>{assets.length}</AsideValue>
        </AsideRow>}

        <AsideRow>
          <AsideText>Claim pattern</AsideText>
          <AsideValue>{currentCampaignClaimPattern}</AsideValue>
        </AsideRow>

        <AsideDivider />

        <AsideRow>
          <AsideText>To be secured (sponsorship)</AsideText>
          <AsideValue>{String(totalComission)} {nativeTokenSymbol}</AsideValue>
        </AsideRow>

        <AsideRow>
          <AsideText>Included into the links</AsideText>
          <AsideValue>{String(totalNativeTokensAmount)} {nativeTokenSymbol}</AsideValue>
        </AsideRow>

        <AsideDivider />

        <AsideRow>
          <AsideText>Total amount</AsideText>
          <AsideValue>{String(totalNativeTokensAmountToSecure)} {nativeTokenSymbol}</AsideValue>
        </AsideRow>


      </AsideContent>
    </Aside>
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(CampaignsCreateSecure)