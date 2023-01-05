import React, { FC } from 'react'

import {
    TextareaContainer,
    TextareaField,
    TextareaTitle,
    TextareaError,
    TextareaFieldContainer,
    TextareaFieldLimit
} from './styled-components'
import { TProps } from './types'
import { ThemeProvider } from 'styled-components'
import themes from 'themes'

const TextareaComponent: FC<TProps> = ({
  placeholder,
  title,
  disabled = false,
  onChange,
  error,
  value = '',
  className,
  limit
}) => {

  const limitContainer = limit ? <TextareaFieldLimit>{value.length || 0}/{limit}</TextareaFieldLimit> : null
    return <ThemeProvider theme={themes.light}>
      <TextareaContainer
        disabled={disabled}
        error={error}
        className={className}
      >
        <TextareaTitle>{title}</TextareaTitle>
        <TextareaFieldContainer>
          <TextareaField
            onChange={(evt) => {
              if (limit && limit > 0) {
                if (Number(evt.target.value.length) > limit) {
                  return
                }
              }
              onChange(evt.target.value)
            }}
            disabled={disabled}
            placeholder={placeholder}
            value={value}
            limit={limit}
          />
          {limitContainer}
        </TextareaFieldContainer>
        
      </TextareaContainer>
      {error && <TextareaError>{error}</TextareaError>}
    </ThemeProvider>
}

export default TextareaComponent
