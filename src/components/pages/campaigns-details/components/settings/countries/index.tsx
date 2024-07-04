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


const Countries: FC<TProps> = ({
  title,
  subtitle,
  onClose,
  action,
  availableCountriesValue
}) => {
  
  return <AsidePopup
    title={title}
    subtitle={subtitle}
    onClose={onClose}
    action={() => {}}
  >
    {availableCountriesValue.length}
  </AsidePopup>
}

export default Countries