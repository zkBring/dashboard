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
import Timeframe from './timeframe'
import RedirectScreen from './redirect'
import Whitelist from './whitelist'

const settings = [
  {
    title: 'Whitelist addresses',
    subtitle: 'You can set up who can claim tokens by whitelisting users by addresses',
    id: 'whitelist'
  }, {
    title: 'Country restrictions',
    subtitle: '',
    id: 'available_countries'
  }, {
    title: 'Timeframe',
    subtitle: 'You can set up the link expiration, so that users will not be able to claim after certain day and time',
    id: 'timeframe'
  }, {
    title: 'Redirect to another URL',
    subtitle: 'When your campaign is finished, existing URL could be redirected to the campaign link or any website',
    id: 'redirect'
  }, {
    title: 'Wallet options',
    subtitle: 'When your campaign is finished, existing URL could be redirected to the campaign link or any website',
    id: 'wallets'
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

  claimUrl: string,
  redirectSubmit: (value: any, onSuccess?: () => void, onError?: () => void) => void,
  whitelistSubmit: (value: any, onSuccess?: () => void, onError?: () => void) => void,


  // redirect
  redirectUrl?: string | null,
  redirectToggleAction?: (value: boolean) => void,
  redirectToggleValue?: boolean,


  // whitelist
  whitelistValue?: string | null,
  whitelistToggleAction?: (value: boolean) => void,
  whitelistToggleValue?: boolean,





  campaignId?: string
) => {
  switch (setting.id) {
    case 'redirect':
      return <RedirectScreen
        {...setting}
        redirectUrl={redirectUrl}
        onClose={onClose}
        claimUrl={claimUrl}
        toggleAction={redirectToggleAction}
        toggleValue={redirectToggleValue}
        action={redirectSubmit}
      />
    case 'timeframe':
      return <Timeframe {...setting} onClose={onClose} />
    case 'whitelist':
      return <Whitelist
        {...setting}
        onClose={onClose}
        toggleAction={whitelistToggleAction}
        toggleValue={whitelistToggleValue}
        action={whitelistSubmit}
        whitelistValue={whitelistValue}
      />
    
    case 'wallets':
    case 'available_countries':
      return <Redirect to={`/campaigns/${campaignId}`} />


    default: null
  }
}

const defineEnabled = (
  settingId: string,
  redirectToggleValue: boolean,
  whitelistValue: boolean,
  wallet: string
) => {
  if (settingId === 'redirect') {
    return redirectToggleValue
  }

  if (settingId === 'whitelist') {
    return whitelistValue
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
    return wallet
  }

  return 'Enabled'
}


const Settings: FC<TProps> = ({
  redirectUrl,
  claimUrl,
  campaignData,
  redirectToggleAction,
  redirectToggleValue,
  redirectSubmit,


  whitelistSubmit,
  whitelistToggleAction,
  whitelistToggleValue,
  whitelistValue
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

    claimUrl,
    redirectSubmit,
    whitelistSubmit,


    redirectUrl,
    redirectToggleAction,
    redirectToggleValue,

    whitelistValue,
    whitelistToggleAction,
    whitelistToggleValue,

    campaignData.campaign_id
  ) : null

  return <WidgetStyled title='Settings'>
    {currentSetting && null}
    {popup}
    {settings.map(setting => {

      const enabled = defineEnabled(
        setting.id,
        Boolean(redirectToggleValue),
        Boolean(whitelistToggleValue),
        campaignData.wallet
      )
      const enabledLabel = defineEnabledLabel(
        setting.id,
        campaignData.wallet
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