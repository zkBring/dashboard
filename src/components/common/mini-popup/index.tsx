import { FC, useEffect } from 'react'
import { Props } from './types'
import {
  MiniPopupContainer,
  MiniPopupContainerClass
} from './styled-components'

const MiniPopup: FC<Props> = ({ children, onClose, className }) => {
  useEffect(() => {
    const callback = (evt: MouseEvent) => {
      const target = evt.target as HTMLDivElement
      if (!target) { return }
      const wasClickedOutside = !target.closest(`.${MiniPopupContainerClass}`)
      if (wasClickedOutside) { onClose() }
    }
    document.addEventListener('click', callback)

    return () => document.removeEventListener('click', callback)
  }, [])
  const classNames = className ? `${MiniPopupContainerClass} ${className}` : MiniPopupContainerClass
  return <MiniPopupContainer className={classNames}>
    {children}
  </MiniPopupContainer>
}

export default MiniPopup