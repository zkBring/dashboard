import { FC, useState } from 'react'
import {
  PopupStyled,
  TextAreaStyled,
  ButtonStyled
} from './styled-components'
import TProps from './types'

const EditPopup: FC<TProps> = ({
  initialValue,
  onUpdate,
  onClose,
  loading
}) => {

  const [
    value,
    setValue
  ] = useState<string>(initialValue)

  return <PopupStyled
    onClose={onClose}
    title='Update description'
  >

    <TextAreaStyled
      title="Description"
      value={value}
      onChange={(value) => {
        setValue(value)
        return value
      }}
    />

    <ButtonStyled
      appearance='action'
      loading={loading}
      disabled={
        value === initialValue || !value
      }
      onClick={() => {
        onUpdate(value)
      }}
    >
      Update
    </ButtonStyled>


  </PopupStyled>
}

export default EditPopup