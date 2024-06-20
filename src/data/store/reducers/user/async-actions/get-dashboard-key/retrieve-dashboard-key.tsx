import { plausibleApi } from 'data/api'
import { ethers } from 'ethers'
import { decrypt } from 'lib/crypto' 
import { toString } from "uint8arrays/to-string"
import { createWalletClient, custom } from 'viem'
import { mainnet } from 'viem/chains'

const retrieveDashboardKey: (
  provider: any,
  encrypted_dashboard_key: string,
  sig_message: string,
  account: string
) => Promise<string | void> = async (
  provider,
  encrypted_dashboard_key,
  sig_message,
  account
) => {

  try {
    const walletClient = createWalletClient({
      chain: mainnet,
      transport: custom(provider),
    })
    alert('retrieveDashboardKey')

    // const signature = await signer.signMessage(String(sig_message))
    let signature = await walletClient.signMessage({ 
      account: account as `0x${string}`,
      message: sig_message
    })

    if (signature.length > 132) {
      signature = `${signature.slice(0,832)}${signature.slice(-64)}` as `0x${string}`
    }

    console.log({ signature })
    const signature_key = ethers.utils.id(signature)

    const signature_key_32 = signature_key.slice(0, 32)

    const signature_key_uint_8_array = new TextEncoder().encode(signature_key_32)

    const signature_key_as_base_16 = toString(signature_key_uint_8_array, 'base16')


    return decrypt(encrypted_dashboard_key, signature_key_as_base_16) 
  } catch (err) {
    console.error({ err })
    plausibleApi.invokeEvent({
      eventName: 'sign_in_signature_reject',
      data: {
        signature: 'retrieve_dashboard_key'
      }
    })
  }
}

export default retrieveDashboardKey