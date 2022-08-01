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
  className
}) => {
  return <RadioButtonsContainer className={className}>
    <RadioButtonsLabel>{label}</RadioButtonsLabel>
    {radios.map(item => <RadioItem
      onClick={() => onChange(item.value)}
      active={value === item.value}
    >
      <RadioButtonController className={RadioButtonControllerClassName}/>
      <RadioButtonLabel>{item.label}</RadioButtonLabel>
    </RadioItem>)}
  </RadioButtonsContainer>
}

export default RadioButtons