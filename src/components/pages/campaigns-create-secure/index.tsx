import { FC, useState, useMemo, useEffect } from 'react'
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
  AsideDivider,
  WidgetSectionTitle,
  WidgetSectionSubtitle
} from 'components/pages/common'
import wallets from 'configs/wallets'
import { addressSpecificOptions } from 'configs/address-specific-options'
import {
  StyledInput,
  CheckboxContainer,
  CheckboxStyled,
  StyledRadio
} from './styled-components'
import { IAppDispatch } from 'data/store'
import * as userAsyncActions from 'data/store/reducers/user/async-actions'
import { useHistory } from 'react-router-dom'
import { shortenString, defineNetworkName, preventPageClose } from 'helpers'
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
      availableWallets: string[],
      callback: () => void
    ) => {
      dispatch(
        userAsyncActions.secure(
          totalNativeTokensAmountToSecure,
          nativeTokensPerLink,
          walletApp,
          availableWallets,
          callback
        )
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
  
  const { id } = useParams<TLinkParams>()
  const nativeTokenSymbol = defineNativeTokenSymbol({ chainId })
  const currentCampaign = id ? campaigns.find(campaign => campaign.campaign_id === id) : null
  const currentCampaignTitle = currentCampaign ? currentCampaign.title : title
  const currentTokenAddress = currentCampaign ? currentCampaign.token_address : tokenAddress
  const currentCampaignChainId = currentCampaign ? currentCampaign.chain_id : chainId
  const currentCampaignTokenStandard = currentCampaign ? currentCampaign.token_standard : tokenStandard
  const currentCampaignTokenSymbol = currentCampaign ? currentCampaign.symbol : symbol
  const currentCampaignClaimPattern = currentCampaign ? currentCampaign.claim_pattern : claimPattern

  const allWallets = useMemo(() => {
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
    return options
  }, [chainId])

  const walletsAvailable = useMemo(() => {
    if (currentCampaign) {
      return currentCampaign.available_wallets
    }
    const options = allWallets
      .map(wallet => wallet.id)
    return options
  }, [chainId])


  const walletsOptions = useMemo(() => {
    const options = allWallets
      .map(wallet => ({
        label: wallet.name,
        value: wallet.id
      }))
    return options
  }, [chainId])

  const [
    currentWallet,
    setCurrentWallet
  ] = useState<string>(walletsOptions[0].value)

  const [
    availableWallets,
    setAvailableWallets
  ] =  useState<string[]>(walletsAvailable)

  useEffect(() => {
    preventPageClose()
  }, [])

  const walletsCheckboxes = useMemo(() => {
    const options = allWallets
      .map(wallet => ({
        label: wallet.name,
        value: availableWallets.includes(wallet.id),
        id: wallet.id,
        disabled: currentWallet === wallet.id
      }))
    return options
  }, [chainId, availableWallets, currentWallet])

  const history = useHistory()
  const [ nativeTokensAmount, setNativeTokensAmount ] = useState<string>('')

  if (!assets || !symbol || !chainId) { return null }

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
      <WidgetComponent title='Options'>
        <WidgetSectionTitle>Preferred wallet</WidgetSectionTitle>
        <WidgetSectionSubtitle>Select the wallet that will be highlighted as “recommended”</WidgetSectionSubtitle>
        <StyledRadio
          disabled={Boolean(currentCampaign) || loading}
          radios={walletsOptions.map(item => ({...item, disabled: !availableWallets.includes(item.value)}))}
          value={currentWallet}
          onChange={value => {
            if (!availableWallets.includes(value)) {
              const updatedAvailableWallets = availableWallets.concat(value)
              setAvailableWallets(updatedAvailableWallets)
            }
            setCurrentWallet(value)
          }}
        />

        <WidgetSectionTitle>Display wallets</WidgetSectionTitle>
        <WidgetSectionSubtitle>Select the wallets user will see as other connection options</WidgetSectionSubtitle>
        <CheckboxContainer>
          {walletsCheckboxes.map(checkbox => <CheckboxStyled
            value={checkbox.value}
            label={checkbox.label}
            disabled={checkbox.disabled || Boolean(currentCampaign)}
            onChange={
              (value) => {
                const updatedAvailableWallets = !value ? availableWallets.filter(item => item !== checkbox.id) : availableWallets.concat(checkbox.id)
                setAvailableWallets(updatedAvailableWallets)
              }
            }
          />)}
        </CheckboxContainer>
        
        
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
            String(currentWallet),
            availableWallets,
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