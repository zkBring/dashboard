import { FC } from 'react'
import { TProps } from './types'
import {
  SwitcherContainer,
  SwitcherItem
} from './styled-components'

const Switcher: FC<TProps> = ({
  options,
  active,
  onChange
}) => {
  return <SwitcherContainer>
    {options.map(option => {
      return <SwitcherItem
        active={option.id === active}
        onClick={() => onChange(option.id)}
      >
        {option.title}
      </SwitcherItem>
    })}

  </SwitcherContainer>
}

export default Switcher