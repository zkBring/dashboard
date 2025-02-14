import React, { FC } from 'react'
import Select from 'react-select'
import { IProps } from './types'
import { Container, SelectTitle, SelectAdditionalText, SelectNotFound, SelectStyledClass } from './styled-components'

const SelectComponent: FC<IProps> = ({
  options,
  value,
  placeholder,
  className,
  onChange,
  title,
  disabled,
  note,
  notFoundActiveCondition,
}) => {
  return (
    <Container>
      {title && <SelectTitle>{title}</SelectTitle>}
      <Select
        options={options}
        className={`${className || ''} ${SelectStyledClass}`}
        isDisabled={disabled}
        noOptionsMessage={({ inputValue }) => {
          const isNotFoundClickable = notFoundActiveCondition && notFoundActiveCondition(inputValue)
          return (
            <SelectNotFound
              isNotFoundClickable={isNotFoundClickable}
              onClick={() => {
                if (!isNotFoundClickable) {
                  return console.log('not clickable')
                }
                onChange && onChange({ label: inputValue, value: inputValue })
              }}
            >
              {inputValue}
            </SelectNotFound>
          )
        }}
        value={value}
        onChange={(value) => {
          if (!value) {
            return
          }
          onChange && onChange(value)
        }}
        placeholder={placeholder}
      />
      {note && (
        <SelectAdditionalText>
          {note}
        </SelectAdditionalText>
      )}
    </Container>
  )
}

export default SelectComponent
