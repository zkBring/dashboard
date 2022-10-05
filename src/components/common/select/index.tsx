import React, { FC } from 'react'
import Select from 'react-select'
import { IProps } from './types'
import { Container, SelectTitle } from './styled-components'

const SelectComponent: FC<IProps> = ({
  options,
  value,
  placeholder,
  className,
  onChange,
  title
}) => <Container>
  {title && <SelectTitle>{title}</SelectTitle>}
  <Select
    options={options}
    className={className}
    value={value}
    onChange={(value) => {
      if (!value) { return }
      onChange && onChange(value)
    }}
    placeholder={placeholder}
  />
</Container>

export default SelectComponent