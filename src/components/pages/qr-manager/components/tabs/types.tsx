import { TQRManagerItemType } from '../../types'

export type TProps = {
  setQRManagerItemType: (qrManagerItemType: TQRManagerItemType ) => void
  activeTab: TQRManagerItemType
}