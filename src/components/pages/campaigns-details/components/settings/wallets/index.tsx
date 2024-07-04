import {
  FC,
  useState,
  useEffect
} from 'react'
import { TProps } from './types'
import {
  AsidePopup
} from 'components/common'
import { InputStyled } from './styled-components'
import { isURL } from 'helpers'


const Wallets: FC<TProps> = ({
  title,
  subtitle,
  onClose,
  action,
  preferredWalletValue,
  availableWalletsValue
}) => {
  
  return <AsidePopup
    title={title}
    subtitle={subtitle}
    onClose={onClose}
    action={() => {}}

  >
    {preferredWalletValue}
    {availableWalletsValue.length}
  </AsidePopup>
}

export default Wallets