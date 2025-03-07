import React, { FC } from 'react'
import { TextAreaContainer, TextAreaField, TextAreaTitle, TextAreaAdditionalText } from './styled-components'
import { IProps } from './types'

const TextAreaComponent: FC<IProps> = ({
  placeholder,
  title,
  disabled = false,
  onChange,
  error,
  value = '',
  className,
  refProp,
  note,
}) => {
  return (
    <TextAreaContainer disabled={disabled} error={error} className={className}>
      {title && <TextAreaTitle error={error}>{title}</TextAreaTitle>}
      <TextAreaField
        ref={refProp}
        onChange={(evt) => onChange(evt.target.value)}
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        error={error}
      />
      {error && (
        <TextAreaAdditionalText type='error'>
          {error}
        </TextAreaAdditionalText>
      )}
      {note && (
        <TextAreaAdditionalText type='note'>
          {note}
        </TextAreaAdditionalText>
      )}
    </TextAreaContainer>
  )
}

export default TextAreaComponent
