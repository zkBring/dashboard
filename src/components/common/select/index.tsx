import React, { FC } from 'react'
import Select from 'react-select'
import { TSelectOption } from 'types'
type OptionsType = Array<TSelectOption>

interface Props {
  options: OptionsType,
  value?: TSelectOption,
  placeholder?: string,
  className?: string,
  onChange: (newValue: TSelectOption) => void
}

const SelectComponent: FC<Props> = ({
  options,
  value,
  placeholder,
  className,
  onChange
}) => <Select
    options={options}
    className={className}
    value={value}
    onChange={(value) => {
      if (!value) { return }
      onChange && onChange(value)
    }}
    placeholder={placeholder}
  />

export default SelectComponent