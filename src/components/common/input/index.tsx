import React, { FC } from 'react'
import {
  InputContainer,
  InputField,
  InputTitle,
  InputAdditionalText,
  InputFieldContainer,
  InputPrefix
} from './styled-components'
import Icons from 'icons'
import { IProps } from './types'

const InputComponent: FC<IProps> = ({
  placeholder,
  title,
  disabled = false,
  type = 'text',
  onChange,
  error,
  name,
  value = '',
  className,
  refProp,
  note,
  onClick,
  icon,
  prefix
}) => {
  return (
    <InputContainer disabled={disabled} error={error} className={className} onClick={onClick}>
      {title && <InputTitle error={error}>{title}</InputTitle>}
      <InputFieldContainer>
        <InputPrefix>
          {icon || prefix || <Icons.InputPenIcon />}
        </InputPrefix>
        <InputField
          ref={refProp}
          name={name}
          onChange={(evt) => onChange(evt.target.value)}
          type={type}
          disabled={disabled}
          placeholder={placeholder}
          value={value}
          error={error}
        />
      </InputFieldContainer>
      
      {error && (
        <InputAdditionalText type='error'>
          {error}
        </InputAdditionalText>
      )}
      {note && (
        <InputAdditionalText type='note'>
          {note}
        </InputAdditionalText>
      )}
    </InputContainer>
  )
}

export default InputComponent
