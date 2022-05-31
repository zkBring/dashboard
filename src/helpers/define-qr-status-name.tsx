import { TQRStatus } from 'types'

const defineName = (status: TQRStatus) : string => {
  switch (status) {
    case 'inserted_to_boxes':
      return 'Being Inserted To Boxes'
    case 'ready_to_ship':
      return 'Ready  To Ship'
    case 'sent_to_printer':
      return 'Sent To Printer'
    case 'way_to_warehouse':
      return 'On Its Way To Warehouse'
    default:
      return ''
  }
}

export default defineName