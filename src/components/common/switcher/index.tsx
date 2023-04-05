import { FC } from 'react'
import { TProps } from './types'
import {
  SwitcherContainer,
  SwitcherItem,
  Container,
  SwitcherTitle,
  SwitcherLoader
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
        const optionDisabled = option.disabled
        return <SwitcherItem
          active={option.id === active}
          disabled={optionDisabled}
          loading={option.id === active && option.loading}
          onClick={() => {
            if (optionDisabled || disabled) { return }
            onChange(option.id)
          }}
        >
          {option.loading && <SwitcherLoader />} {option.title}
        </SwitcherItem>
      })}

    </SwitcherContainer>
  
  </Container>
}

export default Switcher