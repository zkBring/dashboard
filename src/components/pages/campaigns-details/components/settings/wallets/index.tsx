import {
  FC,
  useState,
  useEffect,
  useMemo
} from 'react'
import { TProps } from './types'
import {
  AsidePopup
} from 'components/common'
import {
  RadioStyled,
  CheckboxStyled,
  CheckboxContainer
} from './styled-components'
import { isURL } from 'helpers'
import wallets from 'configs/wallets'


const Wallets: FC<TProps> = ({
  title,
  subtitle,
  onClose,
  action,
  preferredWalletValue,
  availableWalletsValue,
  sponsored,
  chainId,
  loading,
  tokenType
}) => {

  const [
    availableWallets,
    setAvailableWallets
  ] =  useState<string[]>(availableWalletsValue)

  const [
    currentWallet,
    setCurrentWallet
  ] = useState<string>(preferredWalletValue)

  const allWallets = useMemo(() => {
    const options = wallets
      .filter(wallet => {
        if (!chainId) { return false }
        if (!sponsored && !wallet.available_for_not_sponsored) {return false }
        return wallet.chains.includes(String(chainId)) && wallet.token_types.includes(tokenType)
      })
    return options
  }, [])

  const walletsOptions = useMemo(() => {
    const options = allWallets
      .map(wallet => ({
        label: wallet.name,
        value: wallet.id
      }))
    return options
  }, [])

  const walletsCheckboxes = useMemo(() => {
    const options = allWallets
      .map(wallet => ({
        label: wallet.name,
        value: availableWallets.includes(wallet.id),
        id: wallet.id,
        disabled: currentWallet === wallet.id
      }))
    return options
  }, [ availableWallets, currentWallet ])


  
  return <AsidePopup
    title={title}
    subtitle={subtitle}
    onClose={onClose}
    action={() => {
      action(
        availableWallets,
        currentWallet,
        () => onClose()
      )
    }}

  >
    <CheckboxContainer>
      {walletsCheckboxes.map(checkbox => <CheckboxStyled
        value={checkbox.value}
        label={checkbox.label}
        disabled={checkbox.disabled || loading}
        onChange={
          (value) => {
            const updatedAvailableWallets = !value ? availableWallets.filter(item => item !== checkbox.id) : availableWallets.concat(checkbox.id)
            setAvailableWallets(updatedAvailableWallets)
          }
        }
      />)}
    </CheckboxContainer>

    <RadioStyled
      disabled={loading}
      radios={walletsOptions.map(item => ({...item, disabled: !availableWallets.includes(item.value)}))}
      value={currentWallet}
      onChange={value => {
        if (!availableWallets.includes(value)) {
          const updatedAvailableWallets = availableWallets.concat(value)
          setAvailableWallets(updatedAvailableWallets)
        }
        setCurrentWallet(value)
      }}
    />
  </AsidePopup>
}

export default Wallets