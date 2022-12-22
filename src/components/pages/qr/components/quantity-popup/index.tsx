import { FC, useState } from 'react'
import { Popup } from 'components/common'
import { TProps } from './types'
import {
  InputComponent,
  Buttons,
  PopupForm,
  WidgetButton,
  PopupFormContent
} from '../../styled-components'
import { WidgetSubtitle } from 'components/pages/common'

const QuantityPopup: FC<TProps> = ({
  onClose,
  onSubmit,
  quantity,
  loader,
  loading
}) => {
  const [ formQuantity, setFormQuantity ] = useState(quantity || '0')
  const showError = Number(formQuantity) > 300000
  return <Popup
    title='Quantity of QRs in a set'
    onClose={() => {
      onClose()
    }}
  >
    <PopupForm onSubmit={(evt) => {
      evt.preventDefault()
      onSubmit(formQuantity)
    }}>
      <PopupFormContent>
        <WidgetSubtitle>You are able to change the quantity of QRs as many times as you want before you upload links</WidgetSubtitle>
        <InputComponent
          value={String(formQuantity)}
          onChange={value => {
            if (/^[0-9]+$/.test(value) || value === '') {
              setFormQuantity(value)
            }
            return value
          }}
          title='Quantity'
          error={showError ? 'Maximum quantity in a batch is limited by 300,000' : undefined}
          note={showError ? undefined : 'Maximum quantity in a batch is limited by 300,000'}
        />
      </PopupFormContent>

      <Buttons>
        <WidgetButton
          title='Cancel'
          onClick={() => {
            onClose()
          }}
        />

        <WidgetButton
          disabled={loading || !formQuantity || showError}
          title={loading ? `Generating ${Math.ceil(loader * 100)}%` : 'Change'}
          type='submit'
          loading={loading}
          appearance='action'
        />

      </Buttons>
    </PopupForm>
  </Popup>
}

export default QuantityPopup
