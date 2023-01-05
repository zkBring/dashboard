import { TQRStatus } from 'types'

const defineName = (status: TQRStatus) : string => {
  switch (status) {
    case 'BEING_INSERTED_TO_BOXES':
      return 'Being Inserted To Boxes'
    case 'READY_TO_SHIP':
      return 'Ready To Ship'
    case 'NOT_SENT_TO_PRINTER':
      return 'Not Sent To Printer'
    case 'SHIPPED':
      return 'Shipped'
    case 'SHIPPING':
      return 'Shipping'
    case 'SENT_TO_PRINTER':
      return 'Sent To Printer'
    case 'ON_ITS_WAY_TO_WAREHOUSE':
      return 'On Its Way To Warehouse'
    default:
      return ''
  }
}

export default defineName