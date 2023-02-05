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
  TableRow,
  TableText,
  TableValue,
  AsideContent,
  TableValueShorten,
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
    assetsOriginal,
    sdk
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
  sdk
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
  sdk
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
  const currentCampaignTokenSymbol = currentCampaign ? currentCampaign.symbol : symbol
  const currentCampaignClaimPattern = currentCampaign ? currentCampaign.claim_pattern : claimPattern

  const totalNativeTokensAmount = nativeTokensAmount === '' || nativeTokensAmount === '0' ? 0 : multiply(
    bignumber(nativeTokensAmount),
    assets.length
  )

  const potentialComission = multiply(
    comission,
    assets.length
  )

  const totalComission = sponsored ? potentialComission : 0

  const totalNativeTokensAmountToSecure = !sponsored ? totalNativeTokensAmount : add(
    totalNativeTokensAmount,
    totalComission
  )

  const isSponsored = [
    { value: true, label: `Sponsor claim transactions (+ ${potentialComission} ${nativeTokenSymbol})` },
    { value: false, label: `No sponsoring (+ 0 ${nativeTokenSymbol})` }
  ]

  return <Container>
    <WidgetContainer>
      {!sdk && <WidgetComponent title='Transaction sponsorship'>
        <WidgetSubtitle>Selecting to sponsor transactions will allow users to claim tokens without having any {nativeTokenSymbol} in their wallets, otherwise users will pay gas to cover transactions themselves</WidgetSubtitle>
        <StyledRadio
          disabled={Boolean(currentCampaign) || loading}
          radios={isSponsored}
          value={sponsored}
          onChange={value => {
            setSponsored(value)
          }}
        />
      </WidgetComponent>}

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

        {currentCampaignTokenStandard && assetsOriginal && <AssetsList
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
            <TableValue>{String(totalComission)} {nativeTokenSymbol}</TableValue>
          </TableRow>

          <TableRow>
            <TableText>Included into the links</TableText>
            <TableValue>{String(totalNativeTokensAmount)} {nativeTokenSymbol}</TableValue>
          </TableRow>

          <AsideDivider />

          <TableRow>
            <TableText>Total amount</TableText>
            <TableValue>{String(totalNativeTokensAmountToSecure)} {nativeTokenSymbol}</TableValue>
          </TableRow>
        </>}


      </AsideContent>
    </Aside>
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(CampaignsCreateSecure)