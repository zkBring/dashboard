import { TCampaign, TDispenser } from "types"

export type TProps = {
  loading: boolean
  campaignData: TCampaign | null
  availableCountries: string[]
  availableCountriesSubmit: (
    value: any,
    onSuccess?: () => void,
    onError?: () => void,
  ) => void
}

export type TSettingItem = {
  title: string
  subtitle: string
  onClose?: () => void
  id: string
  toggleAction?: () => void,
}