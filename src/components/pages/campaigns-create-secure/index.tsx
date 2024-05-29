import { FC, useState, useMemo, useEffect } from 'react'
import { RootState } from 'data/store'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { TCountry, TLinkParams, TSelectOption } from 'types'
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
  WidgetSubtitle
} from 'components/pages/common'
import wallets from 'configs/wallets'
import {
  StyledInput,
  CheckboxContainer,
  CheckboxStyled,
  StyledRadio,
  Header,
  WidgetTitleStyled,
  ToggleStyled,
  SelectStyled,
  DateTimeContainer,
  Note,
  DatePickerStyled,
  InputsContainer
} from './styled-components'
import { CountriesList } from './components'
import { IAppDispatch } from 'data/store'
import * as userAsyncActions from 'data/store/reducers/user/async-actions'
import { useHistory } from 'react-router-dom'
import {
  shortenString,
  defineNetworkName,
  preventPageClose,
  momentNoOffsetGetTime,
  createSelectOptions,
  momentNoOffsetWithTimeUpdate,
  defineNativeTokenSymbol,
  countNativeTokensToSecure,
  alertError
} from 'helpers'
import { BigNumber } from 'ethers'

const { REACT_APP_CLIENT } = process.env

const mapStateToProps = ({
  user: {
    chainId,
    comission,
    address,
    countries
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
    sponsored,
    expirationDate
  },
}: RootState) => ({
  assets,
  symbol,
  title,
  chainId,
  countriesList: countries,
  tokenAddress,
  campaigns,
  tokenStandard,
  loading,
  assetsOriginal,
  claimPattern,
  sdk,
  sponsored,
  comission,
  address,
  expirationDate
})

const defaultValue = { label: '00', value: '0'}
const selectOptionsHours = createSelectOptions(23, defaultValue)
const selectOptionsMinutes = createSelectOptions(59, defaultValue)

const mapDispatcherToProps = (dispatch: IAppDispatch) => {
  return {
    secure: (
      totalNativeTokensAmountToSecure: BigNumber,
      nativeTokensPerLink: string,
      walletApp: string,
      availableWallets: string[],
      availableCountries: TCountry[],
      expirationDate: number,
      callback: () => void
    ) => {
      dispatch(
        userAsyncActions.secure(
          totalNativeTokensAmountToSecure,
          nativeTokensPerLink,
          walletApp,
          availableWallets,
          availableCountries,
          expirationDate,
          callback
        )
      )
    }
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

const defineSelectOptions = (countries: TCountry[]) => {
  return countries.map(country => ({
    value: country.id,
    label: country.name
  }))
}

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
  expirationDate,
  countriesList
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
  const expirationTime = momentNoOffsetGetTime()

  const allWallets = useMemo(() => {
    const options = wallets
      .filter(wallet => {
        if (!chainId) { return false }
        if (!sponsored && !wallet.available_for_not_sponsored) {return false }
        return wallet.chains.includes(String(chainId)) && wallet.token_types.includes(currentCampaignTokenStandard)
      })
    return options
  }, [chainId])

  const walletsAvailable = useMemo(() => {
    if (currentCampaign) {
      return currentCampaign.available_wallets
    }
    if (REACT_APP_CLIENT === 'coinbase') {
      return ['coinbase_wallet']
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

  const currentCampaignWallet = currentCampaign ? currentCampaign.wallet : (REACT_APP_CLIENT === 'coinbase' ? 'coinbase_wallet' : walletsOptions[0].value)

  const currentCampaignAvailableCountries = useMemo(() => {
    if (!currentCampaign) {
      return []
    }
    const countries = currentCampaign.available_countries
      .map(countryId => {
        const country = countriesList.find(country => country.id === countryId) as TCountry
        return {
          id: country.id,
          name: country.name
        }
      })

    return countries
  }, [chainId])

  const [
    currentWallet,
    setCurrentWallet
  ] = useState<string>(currentCampaignWallet)

  const [
    availableWallets,
    setAvailableWallets
  ] =  useState<string[]>(walletsAvailable)

  const [
    linksExpirationDate,
    setLinksExpirationDate
  ] =  useState<Date>(new Date())

  const [
    countries,
    setCountries
  ] =  useState<TCountry[]>(currentCampaignAvailableCountries)

  const [
    enableExpirationDate,
    setEnableExpirationDate
  ] =  useState<boolean>(false)

  const [
    addNativeTokens,
    setAddNativeTokens
  ] =  useState<boolean>(false)

  const [ hours, setHours ] = useState(expirationTime.hours)
  const [ minutes, setMinutes ] = useState(expirationTime.minutes)

  useEffect(preventPageClose(), [])

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
      {REACT_APP_CLIENT !== 'coinbase' && <WidgetComponent title='Wallet options'>
        <WidgetSectionTitle>Preferred wallet</WidgetSectionTitle>
        <WidgetSubtitle>Select the wallet that will be highlighted as “recommended”</WidgetSubtitle>
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
        <WidgetSubtitle>Select the wallets user will see as other connection options</WidgetSubtitle>
        <CheckboxContainer>
          {walletsCheckboxes.map(checkbox => <CheckboxStyled
            value={checkbox.value}
            label={checkbox.label}
            disabled={checkbox.disabled || Boolean(currentCampaign) || loading}
            onChange={
              (value) => {
                const updatedAvailableWallets = !value ? availableWallets.filter(item => item !== checkbox.id) : availableWallets.concat(checkbox.id)
                setAvailableWallets(updatedAvailableWallets)
              }
            }
          />)}
        </CheckboxContainer>
      </WidgetComponent>}

      <WidgetComponent>
        <Header>
          <WidgetTitleStyled>
            Link expiration
          </WidgetTitleStyled>
          <ToggleStyled
            value={enableExpirationDate}
            disabled={loading}
            onChange={((value) => {
              setEnableExpirationDate(value)
            })}
          />
        </Header>
        <WidgetSubtitle>
          You can set up the link expiration, so that users will not be able to claim after certain day and time
        </WidgetSubtitle>
        {enableExpirationDate && <DateTimeContainer>
          <DatePickerStyled
            title='Expiration date'
            note='Enter expiration date'
            dateFormat='dd MMM yyyy'
            disabled={loading}
            onChange={(value) => setLinksExpirationDate(value)}
            value={linksExpirationDate}
            minDate={new Date(new Date().setDate(new Date().getDate() -1))}
          />

          <SelectStyled
            title='Hours'
            value={hours}
            disabled={loading}
            options={selectOptionsHours}
            onChange={(option) => setHours(option)}
          />

          <SelectStyled
            title='Minutes'
            disabled={loading}
            value={minutes}
            options={selectOptionsMinutes}
            onChange={(option) => setMinutes(option)}
          />

          <Note>UTC+0</Note>

        </DateTimeContainer>}
      </WidgetComponent>

      <WidgetComponent>
        <Header>
          <WidgetTitleStyled>
            Countries whitelist
          </WidgetTitleStyled>
        </Header>
        <WidgetSubtitle>
          If you want to make the campaign available only in certain countries, please add them to the list below
        </WidgetSubtitle>
        <CountriesList
          data={countries}
          onRemove={(id) => {
            setCountries(countries.filter(item => item.id !== id))
          }}
          disabled={Boolean(currentCampaign) || loading}
        />
        <InputsContainer>
          <SelectStyled
            onChange={async ({ value, label }) => {
              const countryId = value
              const countryAlreadyAdded = countries.find(country => country.id === countryId)
              if (countryAlreadyAdded) {
                return alertError(`Country ${countryId} was already added`)
              }
              setCountries([...countries, {
                id: value,
                name: label
              }])
            }}
            value={null}
            disabled={Boolean(currentCampaign) || loading}
            placeholder='Select Country'
            options={defineSelectOptions(countriesList)}
          />
        </InputsContainer>
      </WidgetComponent>

      {!sdk && <WidgetComponent>
        <Header>
          <WidgetTitleStyled>
            Include extra {nativeTokenSymbol}
          </WidgetTitleStyled>
          <ToggleStyled
            value={addNativeTokens}
            disabled={loading}
            onChange={((value) => {
            if (!value) {
              setNativeTokensAmount('')
            }
            setAddNativeTokens(value)
          })} />
        </Header>
        <WidgetSubtitle>Include native tokens to each link as an extra bonus for receiver</WidgetSubtitle>
        {addNativeTokens && <StyledInput
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
      </WidgetComponent>}
    </WidgetContainer>
      
    <Aside
      back={{
        action: () => {
          history.goBack()
        }
      }}
      next={{
        action: () => {
          const finalExpirationDate = enableExpirationDate ? +new Date(momentNoOffsetWithTimeUpdate(linksExpirationDate, Number(hours.value), Number(minutes.value))) : expirationDate

          const redirectURL = currentCampaign ? `/campaigns/edit/${tokenStandard}/${currentCampaign.campaign_id}/generate` : `/campaigns/new/${tokenStandard}/generate`
          secure(
            totalNativeTokensAmountToSecure,
            nativeTokensAmount,
            String(currentWallet),
            availableWallets,
            countries,
            finalExpirationDate,
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