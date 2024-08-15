import { TWallet } from 'types'
const {
  REACT_APP_CLIENT
} = process.env

const defineIfWalletIsAvailableForClient = async (
  wallet: TWallet
) => {
  if (!REACT_APP_CLIENT) return true
  if (!wallet.available_for_client) return true
  const walletAvailability = wallet.available_for_client.find(item => item === REACT_APP_CLIENT)
  if (walletAvailability) return true

  return false
}
export default defineIfWalletIsAvailableForClient