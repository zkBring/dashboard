import { FC, UIEvent } from 'react'
import {
  PopupWrapper,
  Popup,
  PopupTitle,
  CloseButton
} from './styled-components'
import { TProps } from './types'
import Icons from 'icons'

const PopupComponent: FC<TProps> = ({
  title,
  onClose,
  children,
  className
}) => {
  const onClick = (e: UIEvent<HTMLElement>) => {
    const target = (e.target as HTMLElement)
    const currentTarget = (e.currentTarget as HTMLElement)
    if (target === currentTarget) {
      onClose && onClose()
    }
  }

  return <PopupWrapper onClick={onClick}>
    <Popup className={className}>
      {title && <PopupTitle>{title}</PopupTitle>}
      <CloseButton onClick={() => { onClose && onClose() }}>
        <Icons.CloseIcon />
      </CloseButton>
      {children}
    </Popup>
  </PopupWrapper>
}

export default PopupComponent
