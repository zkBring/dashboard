import {
  QRItem,
  QRItemTitle,
  QRItemAmount,
  QRItemStatus,
  QRItemControls,
  QRItemButton
} from './styled-components'

import { FC } from 'react'
import { TQRProps } from './types'
import { defineQRStatusName } from 'helpers'

const QR: FC<TQRProps> = ({
  set_name,
  _id,
  qr_quantity,
  status,
  className,
  onManage
}) => {
  return <QRItem className={className}>
    <QRItemTitle>
      {set_name}
    </QRItemTitle>
    <QRItemAmount>
      <span>{qr_quantity}</span> QR(s)
    </QRItemAmount>
    <QRItemStatus>
      {defineQRStatusName(status)}
    </QRItemStatus>
    <QRItemControls>
      <QRItemButton
        title='Manage'
        appearance='action'
        onClick={onManage}
      />
    </QRItemControls>
  </QRItem>
}

export default QR