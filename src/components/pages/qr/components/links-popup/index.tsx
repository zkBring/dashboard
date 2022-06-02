import { FC, useState, useRef } from 'react'
import { Popup } from 'components/common'
import { TProps } from './types'
import { InputComponent, PopupForm, WidgetButton, PopupFormContent } from '../../styled-components'

const LinksPopup: FC<TProps> = ({
  onClose,
  onSubmit
}) => {
  const [ data, setData ] = useState<any>('')
  return <Popup
    title='Upload links'
    onClose={() => {
      onClose()
    }}
  >
    <PopupForm onSubmit={(evt) => {
      evt.preventDefault()
      const target = (evt.target as HTMLFormElement)
      
      if (!target) { return }
      const { elements } = target
      const file = elements[0] as HTMLInputElement
      if (!file || !file.files) { return }
      const reader = new FileReader()
      reader.readAsBinaryString(file.files[0])
      reader.onloadend = function () {
        console.log(reader.result)
      }
    }}>
      <PopupFormContent>
        <InputComponent
          type='file'
          value={data}
          name='file'
          onChange={(value) => {
            setData(value)
            return ''
          }}
          placeholder='Quantity'
        />
      </PopupFormContent>
      <WidgetButton
        type='submit'
        title='Change'
      />
    </PopupForm>
  </Popup>
}

export default LinksPopup
