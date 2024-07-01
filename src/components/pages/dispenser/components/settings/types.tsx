import { TCampaign } from "types"

export type TProps = {
  claimUrl: string
  redirectUrl?: string | null
  campaignData: TCampaign | null
  redirectToggleAction?: (value: boolean) => void
  redirectToggleValue?: boolean,
  redirectSubmit: (
    value: any,
    onSuccess?: () => void,
    onError?: () => void,
  ) => void

  whitelistSubmit: (
    value: any,
    onSuccess?: () => void,
    onError?: () => void
  ) => void,
  whitelistValue?: string | null,
  whitelistToggleAction?: (value: boolean) => void,
  whitelistToggleValue?: boolean,

}

export type TSettingItem = {
  title: string
  subtitle: string
  onClose?: () => void
  id: string
  toggleAction?: () => void,
  
}