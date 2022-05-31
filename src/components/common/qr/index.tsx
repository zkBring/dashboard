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
  title,
  id,
  amount,
  status,
  className,
  onManage
}) => {
  return <QRItem className={className}>
    <QRItemTitle>
      {title}
    </QRItemTitle>
    <QRItemAmount>
      <span>{amount}</span> QR(s)
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