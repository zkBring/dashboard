import { FC } from 'react'
import { TProps } from "./types"
import {
  RadioButtonsContainer,
  RadioItem,
  RadioButtonsLabel,
  RadioButtonController,
  RadioButtonLabel,
  RadioButtonControllerClassName
} from './styled-components'

const RadioButtons: FC<TProps> = ({
  radios,
  value,
  label,
  onChange,
  className,
  disabled
}) => {
  return <RadioButtonsContainer className={className}>
    {label && <RadioButtonsLabel>{label}</RadioButtonsLabel>}
    {radios.map(item => <RadioItem
      disabled={disabled}
      onClick={() => {
        if (disabled) { return }
        onChange(item.value)
      }}
      active={value === item.value}
    >
      <RadioButtonController className={RadioButtonControllerClassName}/>
      <RadioButtonLabel>{item.label}</RadioButtonLabel>
    </RadioItem>)}
  </RadioButtonsContainer>
}

export default RadioButtons