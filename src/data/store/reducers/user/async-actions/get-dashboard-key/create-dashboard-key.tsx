import { plausibleApi } from 'data/api'
import { ethers } from 'ethers'
import { encrypt, generateKeyPair } from 'lib/crypto' 
import { toString } from "uint8arrays/to-string"
import { createWalletClient, custom } from 'viem'
import { defineWagmiNetwork } from 'helpers'

const createDashboardKey: (
  provider: any,
  sig_message: string,
  account: string,
  chain_id: number,
  is_coinbase: boolean
  ) => Promise<{
    dashboard_key: string,
    encrypted_dashboard_key: string
  } | void> = async (
  provider,
  sig_message,
  account,
  chain_id,
  is_coinbase
) => {

  const network = defineWagmiNetwork(chain_id)

  try {
    const walletClient = createWalletClient({
      chain: network,
      transport: custom(provider)
    })

    console.log({
      sig_message
    })

    let signature = await walletClient.signMessage({ 
      account: account as `0x${string}`,
      message: sig_message
    })

    console.log({
      originalSignature: signature
    })

    if (is_coinbase) {
      signature = `${signature.slice(0,832)}${signature.slice(-64)}` as `0x${string}`

      console.log({
        updatedSignature: `first 832 symbols + last 64 symbols: ${signature}`
      })
    }

    console.log({ signature })
    const signature_key = ethers.utils.id(signature)
    const { privateKey: dashboard_key } = generateKeyPair()
    const signature_key_32 = signature_key.slice(0, 32)
    const signature_key_uint_8_array = new TextEncoder().encode(signature_key_32)
    const signature_key_as_base_16 = toString(signature_key_uint_8_array, 'base16')
    const encrypted_dashboard_key = encrypt(dashboard_key, signature_key_as_base_16)

    return {
      dashboard_key,
      encrypted_dashboard_key
    }
  } catch (err) {
    console.error({ err })
    plausibleApi.invokeEvent({
      eventName: 'sign_in_signature_reject',
      data: {
        signature: 'create_dashboard_key'
      }
    })
  }
}

export default createDashboardKey