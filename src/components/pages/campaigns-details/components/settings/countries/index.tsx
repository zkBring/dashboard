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
import { TCountry } from 'types'


const Countries: FC<TProps> = ({
  title,
  subtitle,
  onClose,
  action,
  toggleAction,
  toggleValue,
  availableCountriesValue,
  countries
}) => {

  const [
    availableCountries,
    setAvailableCountries
  ] = useState<TCountry[]>(availableCountriesValue)
  
  return <AsidePopup
    title={title}
    subtitle={subtitle}
    onClose={onClose}
    toggleAction={toggleAction}
    toggleState={toggleValue}
    action={() => {}}
  >
    {availableCountriesValue.length}
  </AsidePopup>
}

export default Countries