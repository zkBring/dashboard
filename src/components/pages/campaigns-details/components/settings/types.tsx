import { TCampaign, TCountry } from "types"

export type TProps = {
  loading: boolean
  campaignData: TCampaign | null
  
  availableCountriesSubmit: (
    value: any,
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

  buttonTitleValue: string
  buttonHrefValue: string

  finalScreenButtonSubmit: (
    buttonTitle: string,
    buttonHref: string,
    successAction?: () => void,
    errorAction?: () => void
  ) => void

}

export type TSettingItem = {
  title: string
  subtitle: string
  onClose?: () => void
  id: string
  toggleAction?: () => void,
}