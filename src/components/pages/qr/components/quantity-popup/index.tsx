import { FC, useState } from 'react'
import { Popup } from 'components/common'
import { TProps } from './types'
import { InputComponent, PopupForm, WidgetButton, PopupFormContent } from '../../styled-components'

const QuantityPopup: FC<TProps> = ({
  onClose,
  onSubmit,
  quantity
}) => {
  const [ formQuantity, setFormQuantity ] = useState(quantity || '0')
  return <Popup
    title='Change quantity of QRs needed'
    onClose={() => {
      onClose()
    }}
  >
    <PopupForm onSubmit={(evt) => {
      evt.preventDefault()
      onSubmit(formQuantity)
    }}>
      <PopupFormContent>
        <InputComponent
          value={String(formQuantity)}
          onChange={value => { setFormQuantity(value); return value }}
          placeholder='Quantity'
        />
      </PopupFormContent>
      <WidgetButton
        title='Change'
      />
    </PopupForm>
  </Popup>
}

export default QuantityPopup
