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
  CheckboxContainer,
  SelectStyled
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

  const walletsOptions = useMemo(() => {
    const options = walletsCheckboxes
      .filter(wallet => wallet.value)
      .map(wallet => ({
        label: wallet.label,
        value: wallet.id
      }))
    return options
  }, [ availableWallets ])


  
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

    <SelectStyled
      options={walletsOptions}
      title='Preferred wallet'
      disabled={loading}
      onChange={({ value }) => {
        if (!availableWallets.includes(value)) {
          const updatedAvailableWallets = availableWallets.concat(value)
          setAvailableWallets(updatedAvailableWallets)
        }
        setCurrentWallet(value)
      }}
      value={walletsOptions.find(wallet => wallet.value === currentWallet)}
    />

  </AsidePopup>
}

export default Wallets