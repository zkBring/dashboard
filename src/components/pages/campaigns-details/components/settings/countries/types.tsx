import { TCountry } from "types"

export type TProps = {
  title: string
  subtitle: string
  onClose: () => void
  id: string
  availableCountriesValue: TCountry[]
  action: (
    availableCountriesValue: string[],
    successAction?: () => void,
    errorAction?: () => void
  ) => void
}