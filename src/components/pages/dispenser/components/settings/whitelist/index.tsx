import { FC } from 'react'
import { TProps } from './types'
import {
  AsidePopup
} from 'components/common'

const Whitelist: FC<TProps> = ({
  title,
  subtitle,
  onClose,
  toggleAction,
  toggleValue
}) => {
  console.log({ toggleValue })
  return <AsidePopup
    title={title}
    subtitle={subtitle}
    onClose={onClose}
    action={() => {}}
    toggleAction={toggleAction}
    toggleState={toggleValue}
  >
    
  </AsidePopup>
}

export default Whitelist