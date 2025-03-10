import React, { FC } from 'react'
import { TProps } from './types'
import {
  SwitcherContainer,
  SwitcherItem,
  Container,
  SwitcherTitle,
  SwitcherLoader,
  AdditionalTag
} from './styled-components'

const Switcher: FC<TProps> = ({
  options,
  active,
  onChange,
  disabled,
  title,
  className
}) => {
  return (
    <Container className={className}>
      <SwitcherTitle>{title}</SwitcherTitle>
      <SwitcherContainer disabled={disabled}>
        {options.map((option) => {
          const optionDisabled = option.disabled
          return (
            <SwitcherItem
              key={option.id}
              active={option.id === active}
              disabled={optionDisabled}
              loading={option.id === active && option.loading}
              onClick={() => {
                if (optionDisabled || disabled) {
                  return
                }
                onChange(option.id)
              }}
            >
              {option.loading && <SwitcherLoader />} {option.title}
              {option.additionalTag && <AdditionalTag>
                {option.additionalTag}
              </AdditionalTag>}
            </SwitcherItem>
          )
        })}
      </SwitcherContainer>
    </Container>
  )
}

export default Switcher
