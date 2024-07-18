import {
  FC,
  useState
} from 'react'
import {
  WidgetStyled,
  TableValueStyled,
  ButtonStyled,
  TableTextStyled
} from './styled-components'
import {
  TProps,
  TSettingItem
} from './types'
import {
  TableRow
} from 'components/pages/common'
import Icons from 'icons'
import { TCountry, TDispenser, TTokenType } from 'types'
import Wallets from './wallets'
import Countries from './countries'
import FinalScreenButton from './final-screen-button'
import wallets from 'configs/wallets'
import { Tooltip } from 'components/common'

const { REACT_APP_CLIENT } = process.env

const settings = [
  {
    title: 'Country restrictions',
    subtitle: 'If you want to make the campaign available only in certain countries, please toggle on this feature and add countries from the list below',
    id: 'available_countries',
    tooltip: 'Select which countries can claim tokens'
  }, {
    title: 'Wallet options',
    subtitle: 'Setup the wallet that will be highlighted as “recommended” and select the wallets that will be displayed as alternative options to connect to Claim App to claim tokens',
    id: 'wallets',
    tooltip: 'Display preferred wallet as primary option when claiming tokens'
  }, {
    title: 'Final Screen Button',
    subtitle: 'You can add a custom button to the final screen after a user claims your tokens. When clicked, it will redirect the user to the URL you specify below',
    id: 'final_screen_button',
    tooltip: 'Add a primary button to the final screen that leads to any URL'
  }
]


const renderSettingItem = (
  settingItem: TSettingItem,
  enabled: boolean,
  onClick: () => void,
  enabledLabel?: string,
  disabledLabel?: string
) => {
  return <TableRow onClick={onClick}>
    <TableTextStyled>
      {settingItem.title}
      <Tooltip text={settingItem.tooltip}>
        <Icons.InformationIcon />
      </Tooltip>
    </TableTextStyled>
    <TableValueStyled>
      <ButtonStyled
        appearance='additional'
        size='extra-small'
        onClick={onClick}
      >
        {enabled ? (enabledLabel || 'On') : (disabledLabel || 'Off')}
      </ButtonStyled>      
    </TableValueStyled>
  </TableRow>
}

const definePopup = (
  setting: TSettingItem,
  loading: boolean,
  onClose: () => void,

  availableCountriesSubmit: (
    value: any,
    onSuccess?: () => void,
    onError?: () => void,
  ) => void,
  availableCountriesValue: TCountry[],

  walletsSubmit: (
    availableWalletsValue: any,
    wallets: any,
    onSuccess?: () => void,
    onError?: () => void,
  ) => void,
  availableWalletsValue: string[],
  preferredWalletValue: string,

  finalScreenButtonSubmit: (
    buttonTitleValue: string,
    buttonHrefValue: string,
    successAction?: () => void,
    errorAction?: () => void
  ) => void,
  buttonTitleValue: string,
  buttonHrefValue: string,
  countries: TCountry[],

  sposored: boolean,
  chainId: number,
  tokenType: TTokenType,

  finalScreenButtonToggleAction?: (value: boolean) => void,
  finalScreenButtonToggleValue?: boolean,
  availableCountriesToggleAction?: (value: boolean) => void,
  availableCountriesToggleValue?: boolean,

  campaignId?: string,
) => {
  switch (setting.id) {
    case 'wallets':
      return <Wallets
        {...setting}
        loading={loading}
        tokenType={tokenType}
        onClose={onClose}
        availableWalletsValue={availableWalletsValue}
        preferredWalletValue={preferredWalletValue}
        action={walletsSubmit}
        sponsored={sposored}
        chainId={chainId}
      />
    case 'available_countries':
      return <Countries
        {...setting}
        onClose={onClose}
        availableCountriesValue={availableCountriesValue}
        action={availableCountriesSubmit}
        countries={countries}
        toggleAction={availableCountriesToggleAction}
        toggleValue={availableCountriesToggleValue}
      />
    
    case 'final_screen_button':
      return <FinalScreenButton
        {...setting}
        onClose={onClose}
        buttonTitleValue={buttonTitleValue}
        buttonHrefValue={buttonHrefValue}
        action={finalScreenButtonSubmit}
        toggleAction={finalScreenButtonToggleAction}
        toggleValue={finalScreenButtonToggleValue}
      />

    default: null
  }
}

const defineEnabled = (
  settingId: string,
  availableCountriesToggleValue: boolean,
  finalScreenButtonToggleValue: boolean,
  wallet: string
) => {

  if (settingId === 'available_countries') {
    return availableCountriesToggleValue
  }

  if (settingId === 'final_screen_button') {
    return finalScreenButtonToggleValue
  }

  if (settingId === 'wallets') {
    return Boolean(wallet)
  }
  
  return false
}

const defineEnabledLabel = (
  settingId: string,
  wallet: string
) => {
  if (settingId === 'wallets') {
    const walletApp = wallets.find(walletApp =>  walletApp.id === wallet)
    if (walletApp) {
      return walletApp?.name
    }
  }

  return 'Enabled'
}


const Settings: FC<TProps> = ({
  availableCountriesSubmit,
  availableCountriesValue,

  walletsSubmit,
  availableWalletsValue,
  preferredWalletValue,

  finalScreenButtonSubmit,
  buttonTitleValue,
  buttonHrefValue,
  
  campaignData,
  loading,

  finalScreenButtonToggleAction,
  finalScreenButtonToggleValue,
  countries,
  

  availableCountriesToggleAction,
  availableCountriesToggleValue
}) => {

  if (!campaignData) {
    return null
  }
  const [
    currentSetting,
    setCurrentSetting
  ] = useState<null | TSettingItem>(null)

  const popup = currentSetting ? definePopup(
    currentSetting,
    loading,
    () => setCurrentSetting(null),
    availableCountriesSubmit,
    availableCountriesValue,
    walletsSubmit,
    availableWalletsValue,
    preferredWalletValue,

    finalScreenButtonSubmit,
    buttonTitleValue,
    buttonHrefValue,
    countries,
    campaignData.sponsored,
    campaignData.chain_id,
    campaignData.token_standard,
    finalScreenButtonToggleAction,
    finalScreenButtonToggleValue,
    availableCountriesToggleAction,
    availableCountriesToggleValue,
    campaignData.campaign_id,
    
  ) : null

  return <WidgetStyled title='Settings'>
    {currentSetting && null}
    {popup}
    {settings.map(setting => {

      const enabled = defineEnabled(
        setting.id,
        Boolean(availableCountriesToggleValue),
        Boolean(finalScreenButtonToggleValue),
        preferredWalletValue
      )
      const enabledLabel = defineEnabledLabel(
        setting.id,
        preferredWalletValue
      )

      if (REACT_APP_CLIENT === 'coinbase') {
        if (setting.id === 'wallets') {
          return null
        }
      }

      return renderSettingItem(
        setting,
        enabled,
        () => setCurrentSetting(setting),
        enabledLabel
      )})
    }
  </WidgetStyled>
}

export default Settings