import {
  FC,
  useState,
  useEffect
} from 'react'
import { TProps } from './types'
import {
  AsidePopup
} from 'components/common'
import { InputStyled } from './styled-components'
import { isURL } from 'helpers'

const FinalScreenButton: FC<TProps> = ({
  title,
  subtitle,
  onClose,
  action,
  buttonHrefValue,
  buttonTitleValue,
  toggleAction,
  toggleValue
}) => {
  const [ buttonHref, setButtonHref ] = useState<string>(buttonHrefValue || '')
  const [ buttonTitle, setButtonTitle ] = useState<string>(buttonTitleValue || '')

  return <AsidePopup
    title={title}
    subtitle={subtitle}
    onClose={onClose}
    toggleAction={toggleAction}
    toggleState={toggleValue}
    action={() => {
      action(
        buttonTitle,
        buttonHref,
        () => onClose()
      )
    }}
  >
    <InputStyled
      placeholder="Text on the button"
      value={buttonTitle}
      onChange={(value) => {
        setButtonTitle(value)
        return value
      }}
    />

    <InputStyled
      placeholder="https://"
      value={buttonHref}
      onChange={(value) => {
        setButtonHref(value)
        return value
      }}
    />

  </AsidePopup>
}

export default FinalScreenButton