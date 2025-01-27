import {
  FC,
  useState
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
  // reclaimAppId,
  // reclaimAppSecret,
  // reclaimProviderId,
  instagramFollowId,
  action
}) => {
  // const [
  //   reclaimAppIdValue, setReclaimAppIdValue
  // ] = useState<string>(reclaimAppId || '')
  // const [
  //   reclaimAppSecretValue, setReclaimAppSecretValue
  // ] = useState<string>(reclaimAppSecret || '')
  // const [
  //   reclaimProviderIdValue, setReclaimProviderIdValue
  // ] = useState<string>(reclaimProviderId || '')

  const [
    reclaimInstagramFollowId, setReclaimInstagramFollowId
  ] = useState<string>(instagramFollowId || '')

  return <AsidePopup
    title={title}
    subtitle={subtitle}
    onClose={onClose}
    action={() => action(
      // reclaimAppIdValue,
      // reclaimAppSecretValue,
      // reclaimProviderIdValue,
      reclaimInstagramFollowId,
      () => onClose()
    )}
    actionDisabled={
      // !reclaimAppIdValue ||
      // !reclaimAppSecretValue ||
      // !reclaimProviderIdValue
      !reclaimInstagramFollowId
    }
  >
    {/* <InputStyled
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
      title='Reclaim App Secret'
      placeholder='Reclaim App Secret'
      onChange={value => {
        setReclaimAppSecretValue(value)
        return value
      }}
    />

    <InputStyled
      title='Reclaim Provider ID'
      value={reclaimProviderIdValue}
      placeholder='Reclaim Provider ID'
      onChange={value => {
        setReclaimProviderIdValue(value)
        return value
      }}
    /> */}

    <InputStyled
      title='Instagram follow ID'
      value={reclaimInstagramFollowId}
      placeholder='Instagram follow ID'
      onChange={value => {
        setReclaimInstagramFollowId(value)
        return value
      }}
    />
  </AsidePopup>
}

export default Redirect