import { FC } from 'react'
import TCheckbox from './type'
import { CheckboxContainer, CheckboxInput, CheckboxLabel } from './styled-components'

const Checkbox: FC<TCheckbox> = ({
  label,
  onChange,
  value
}) => {
  return <CheckboxContainer onClick={() => onChange && onChange(!value)}>
    <CheckboxInput
      type='checkbox'
      checked={value}
    />
    {label && <CheckboxLabel>
      {label}
    </CheckboxLabel>}
  </CheckboxContainer>
}

export default Checkbox