import {
  FC,
  useState,
  useMemo
} from 'react'
import { TProps } from './types'
import {
  AsidePopup
} from 'components/common'
import {
  SelectStyled
} from './styled-components'
import wallets from 'configs/wallets'

const Wallets: FC<TProps> = ({
  title,
  subtitle,
  onClose,
  action,
  preferredWalletValue,
  sponsored,
  chainId,
  loading,
  tokenType,
  toggleAction,
  toggleValue
}) => {
  

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

  return <AsidePopup
    title={title}
    subtitle={subtitle}
    onClose={onClose}
    toggleAction={toggleAction}
    toggleState={toggleValue}
    action={() => {
      action(
        currentWallet,
        () => onClose()
      )
    }}
  >
    {toggleValue && <>
      <SelectStyled
        options={walletsOptions}
        title='Preferred wallet'
        disabled={loading}
        onChange={({ value }) => {
          setCurrentWallet(value)
        }}
        value={walletsOptions.find(wallet => wallet.value === currentWallet)}
      />
    </>}
    

  </AsidePopup>
}

export default Wallets