import { TQRStatus } from 'types'

const qrStatus: TQRStatus[] = [
  'NOT_SENT_TO_PRINTER',
  'SENT_TO_PRINTER',
  'ON_ITS_WAY_TO_WAREHOUSE',
  'BEING_INSERTED_TO_BOXES',
  'READY_TO_SHIP',
  'SHIPPING',
  'SHIPPED'
]

export default qrStatus 