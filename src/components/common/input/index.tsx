import React, { FC } from 'react'
import {
  InputContainer,
  InputField,
  InputTitle,
  InputAdditionalText
} from './styled-components'
import { IProps } from './types'
import Icons from 'icons'

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
  customRef,
  note
}) => {
  return <InputContainer
    disabled={disabled}
    error={error}
    className={className}
  >
    {title && <InputTitle error={error}>{title}</InputTitle>}
    <InputField
      ref={customRef}
      onChange={(evt) => onChange(evt.target.value)}
      type={type}
      disabled={disabled}
      placeholder={placeholder}
      value={value}
      error={error}
    />
    {error && <InputAdditionalText type='error'>
      <Icons.InputNoteIcon />{error}
    </InputAdditionalText>}
    {note && <InputAdditionalText type='note'>
      <Icons.InputNoteIcon />{note}
    </InputAdditionalText>}
  </InputContainer>
}

export default InputComponent
