import { FC } from 'react'
import Select from 'react-select'
import { IProps } from './types'
import {
  Container,
  SelectTitle,
  SelectAdditionalText,
  SelectNotFound,
  SelectStyledClass
} from './styled-components'
import Icons from 'icons'

const SelectComponent: FC<IProps> = ({
  options,
  value,
  placeholder,
  className,
  onChange,
  title,
  disabled,
  note,
  notFoundActiveCondition
}) => <Container>
  {title && <SelectTitle>{title}</SelectTitle>}
  <Select
    options={options}
    className={`${className || ''} ${SelectStyledClass}`}
    isDisabled={disabled}
    noOptionsMessage={({ inputValue }) => {
      const isNotFoundClickable = notFoundActiveCondition && notFoundActiveCondition(inputValue)
      return <SelectNotFound
        isNotFoundClickable={isNotFoundClickable}
        onClick={() => {
          if (!isNotFoundClickable) { return }
          onChange && onChange({ label: inputValue, value: inputValue })
        }}
      >
        {inputValue}
      </SelectNotFound>
    }}
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