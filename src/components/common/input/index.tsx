import React, { FC } from 'react'

import {
  InputContainer,
  InputField,
  InputTitle,
  InputError
} from './styled-components'

import { ThemeProvider } from 'styled-components'
import themes from 'themes'
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
  ref
}) => {
  return <ThemeProvider theme={themes.light}>
    <InputContainer
      disabled={disabled}
      error={error}
      className={className}
    >
      {title && <InputTitle>{title}</InputTitle>}
      <InputField
        ref={ref}
        onChange={(evt) => onChange(evt.target.value)}
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        value={value}
      />
    </InputContainer>
    {error && <InputError>{error}</InputError>}
  </ThemeProvider>
}

export default InputComponent
