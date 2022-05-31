import { FC, UIEvent } from 'react'
import {
  PopupWrapper,
  Popup,
  PopupTitle
} from './styled-components'
import { TProps } from './types'

const PopupComponent: FC<TProps> = ({
  title,
  onClose,
  children
}) => {
  const onClick = (e: UIEvent<HTMLElement>) => {
    const target = (e.target as HTMLElement)
    const currentTarget = (e.currentTarget as HTMLElement)
    if (target === currentTarget) {
      onClose && onClose()
    }
  }

  return <PopupWrapper onClick={onClick}>
    <Popup>
      {title && <PopupTitle>{title}</PopupTitle>}
      {children}
    </Popup>
  </PopupWrapper>
}

export default PopupComponent
