import {
  FC,
  useState
} from 'react'
import { Redirect } from 'react-router-dom'
import {
  WidgetStyled,
  TableValueStyled,
  ButtonStyled
} from './styled-components'
import {
  TProps,
  TSettingItem
} from './types'
import {
  TableRow,
  TableText,
} from 'components/pages/common'
import Icons from 'icons'
import { TCountry, TDispenser } from 'types'
import Wallets from './wallets'
import Countries from './countries'
import FinalScreenButton from './final-screen-button'

const settings = [
  {
    title: 'Country restrictions',
    subtitle: 'If you want to make the campaign available only in certain countries, please toggle on this feature and add countries from the list below',
    id: 'available_countries'
  }, {
    title: 'Wallet options',
    subtitle: 'Setup the wallet that will be highlighted as “recommended” and select the wallets that will be displayed as alternative options to connect to Claim App to claim tokens',
    id: 'wallets'
  }, {
    title: 'Final Screen Button',
    subtitle: 'You can add a custom button to the final screen after a user claims your tokens. When clicked, it will redirect the user to the URL you specify below',
    id: 'final_screen_button'
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
    <TableText>
      {settingItem.title}
    </TableText>
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
        onClose={onClose}
        availableWalletsValue={availableWalletsValue}
        preferredWalletValue={preferredWalletValue}
        action={walletsSubmit}
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
  finalScreenButtonToggleValue: boolean
) => {

  if (settingId === 'available_countries') {
    return availableCountriesToggleValue
  }

  if (settingId === 'final_screen_button') {
    return finalScreenButtonToggleValue
  }
  
  return false
}

const defineEnabledLabel = (
  settingId: string,
  wallet: string
) => {
  if (settingId === 'wallets') {
    return wallet
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
        Boolean(finalScreenButtonToggleValue)
      )
      const enabledLabel = defineEnabledLabel(
        setting.id,
        preferredWalletValue
      )

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