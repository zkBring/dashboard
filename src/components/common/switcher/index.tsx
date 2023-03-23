import { FC } from 'react'
import { TProps } from './types'
import {
  SwitcherContainer,
  SwitcherItem,
  Container,
  SwitcherTitle
} from './styled-components'

const Switcher: FC<TProps> = ({
  options,
  active,
  onChange,
  disabled,
  title
}) => {
  return <Container>
    <SwitcherTitle>{title}</SwitcherTitle>
    <SwitcherContainer disabled={disabled}>
      {options.map(option => {
        return <SwitcherItem
          active={option.id === active}
          disabled={disabled}
          onClick={() => {
            if (disabled) { return }
            onChange(option.id)
          }}
        >
          {option.title}
        </SwitcherItem>
      })}

    </SwitcherContainer>
  
  </Container>
}

export default Switcher