import {
  FC,
  useState
} from 'react'
import { TProps } from './types'
import {
  AsidePopup
} from 'components/common'
import { InputStyled } from './styled-components'

const AppTitle: FC<TProps> = ({
  title,
  subtitle,
  onClose,
  toggleAction,
  appTitle,
  toggleValue,
  action
}) => {
  const [
    currentAppTitle, setCurrentAppTitle
  ] = useState<string>(appTitle || '')

  return <AsidePopup
    title={title}
    subtitle={subtitle}
    onClose={onClose}
    action={() => action(
      currentAppTitle,
      () => onClose()
    )}
    toggleAction={(value) => {
      toggleAction && toggleAction(value)
    }}
    toggleState={toggleValue}
  >
    {toggleValue && <InputStyled
      value={currentAppTitle}
      onChange={value => {
        setCurrentAppTitle(value)
        return value
      }}
    />}
    
  </AsidePopup>
}

export default AppTitle