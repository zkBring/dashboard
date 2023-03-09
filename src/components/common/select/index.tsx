import React, { FC } from 'react'
import Select from 'react-select'
import { IProps } from './types'
import { Container, SelectTitle, SelectAdditionalText } from './styled-components'
import Icons from 'icons'

const SelectComponent: FC<IProps> = ({
  options,
  value,
  placeholder,
  className,
  onChange,
  title,
  disabled,
  note
}) => <Container>
  {title && <SelectTitle>{title}</SelectTitle>}
  <Select
    options={options}
    className={className}
    isDisabled={disabled}
    value={value}
    onChange={(value) => {
      if (!value) { return }
      onChange && onChange(value)
    }}
    placeholder={placeholder}
  />
  {note && <SelectAdditionalText>
    <Icons.InputNoteIcon />{note}
  </SelectAdditionalText>}
</Container>

export default SelectComponent