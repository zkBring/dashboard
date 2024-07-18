import { TCampaign, TCountry } from "types"

export type TProps = {
  loading: boolean
  campaignData: TCampaign | null
  
  availableCountriesSubmit: (
    value: string[],
    onSuccess?: () => void,
    onError?: () => void,
  ) => void
  availableCountriesValue: TCountry[]

  walletsSubmit: (
    availableWalletsValue: any,
    wallets: any,
    onSuccess?: () => void,
    onError?: () => void,
  ) => void

  availableWalletsValue: string[]
  preferredWalletValue: string

  countries: TCountry[]

  buttonTitleValue: string
  buttonHrefValue: string

  finalScreenButtonSubmit: (
    buttonTitle: string,
    buttonHref: string,
    successAction?: () => void,
    errorAction?: () => void
  ) => void

  finalScreenButtonToggleAction?: (value: boolean) => void
  finalScreenButtonToggleValue?: boolean
  

  availableCountriesToggleAction?: (value: boolean) => void
  availableCountriesToggleValue?: boolean

}

export type TSettingItem = {
  title: string
  subtitle: string
  onClose?: () => void
  id: string
  toggleAction?: () => void
  tooltip: string

}