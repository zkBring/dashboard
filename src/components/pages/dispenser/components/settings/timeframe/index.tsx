import { FC } from 'react'
import { TProps } from './types'
import {
  AsidePopup
} from 'components/common'

const Timeframe: FC<TProps> = ({
  title,
  subtitle,
  onClose,
  toggleAction
}) => {
  return <AsidePopup
    title={title}
    subtitle={subtitle}
    onClose={onClose}
    action={() => {}}
    toggleAction={toggleAction}
  >
    
  </AsidePopup>
}

export default Timeframe