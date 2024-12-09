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

const Redirect: FC<TProps> = ({
  title,
  subtitle,
  onClose,
  toggleAction,
  reclaimAppId,
  reclaimAppSecret,
  reclaimProviderId,
  toggleValue,
  action
}) => {
  const [
    reclaimAppIdValue, setReclaimAppIdValue
  ] = useState<string>(reclaimAppId || '')
  const [
    reclaimAppSecretValue, setReclaimAppSecretValue
  ] = useState<string>(reclaimAppSecret || '')
  const [
    reclaimProviderIdValue, setReclaimProviderIdValue
  ] = useState<string>(reclaimProviderId || '')

  return <AsidePopup
    title={title}
    subtitle={subtitle}
    onClose={onClose}
    action={() => action(
      reclaimAppIdValue,
      reclaimAppSecretValue,
      reclaimProviderIdValue,
      () => onClose()
    )}
    actionDisabled={
      !reclaimAppIdValue ||
      !reclaimAppSecretValue ||
      !reclaimProviderIdValue
    }
    toggleAction={(value) => {
      toggleAction && toggleAction(value)
    }}
    toggleState={toggleValue}
  >
    {toggleValue && <>
      <InputStyled
        value={reclaimAppIdValue}
        title='Reclaim App ID'
        placeholder='Reclaim App ID'
        onChange={value => {
          setReclaimAppIdValue(value)
          return value
        }}
      />

      <InputStyled
        value={reclaimAppSecretValue}
        placeholder='Reclaim App Secret'
        onChange={value => {
          setReclaimAppSecretValue(value)
          return value
        }}
      />

      <InputStyled
        value={reclaimProviderIdValue}
        placeholder='Reclaim Provider ID'
        onChange={value => {
          setReclaimProviderIdValue(value)
          return value
        }}
      />
    </>}
  </AsidePopup>
}

export default Redirect