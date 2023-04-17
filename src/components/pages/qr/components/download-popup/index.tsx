import { FC, useState } from 'react'
import { Popup } from 'linkdrop-ui'
import { TProps } from './types'
import {
  InputComponent,
  PopupForm,
  WidgetButton,
  PopupFormContent,
  Buttons
} from '../../styled-components'
import { useHistory } from 'react-router-dom'
import { alertError } from 'helpers'

const DPI = 300

const convertInchesToPixels = (value: string) => {
  if (!value) { return alertError('Value is not valid') }
  if (isNaN(Number(value))) { return alertError('Value is not valid') }
  return Number(value) * DPI
}

const DownloadPopup: FC<TProps> = ({
  onClose,
  id
}) => {
  const history = useHistory()
  const [ formSize, setFormSize ] = useState('2')
  const showError = Number(formSize) > 5
  
  return <Popup
    title='Specify the size of the QR code'
    onClose={() => {
      onClose()
    }}
  >
    <PopupForm onSubmit={(evt) => {
      evt.preventDefault()
    }}>
      <PopupFormContent>
        <InputComponent
          title='Width and width (inches)'
          value={String(formSize)}
          onChange={value => {
            if (/^[0-9.]+$/.test(value) || value === '') {
              setFormSize(value)
            }
            return value
          }}
          error={showError ? 'Maximum size is limited by 5 inches' : undefined}
          note={showError ? undefined : 'Maximum size is limited by 5 inches'}
        />
      </PopupFormContent>
      <Buttons>
        <WidgetButton
          disabled={!formSize}
          onClick={() => {
            const currentSize = convertInchesToPixels(formSize)
            if (currentSize) {
              history.push(`/qrs/${id}/download?width=${encodeURIComponent(currentSize)}&height=${encodeURIComponent(currentSize)}`)
            }
          }}
          title='Download'
        />
      </Buttons>
      
    </PopupForm>
  </Popup>
}

export default DownloadPopup
