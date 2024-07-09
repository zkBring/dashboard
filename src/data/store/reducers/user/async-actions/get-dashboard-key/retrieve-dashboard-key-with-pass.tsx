import { plausibleApi } from 'data/api'
import { ethers } from 'ethers'
import { decrypt } from 'lib/crypto' 
import { toString } from "uint8arrays/to-string"
import { createWalletClient, custom } from 'viem'
import { defineWagmiNetwork } from 'helpers'

const retrieveDashboardKeyWithPass: (
  encrypted_dashboard_key: string,
  sig_message: string,
  account: string,
  chain_id: number
) => Promise<string | void> = async (
  encrypted_dashboard_key,
  sig_message,
  account,
  chain_id
) => {
  try {

    let signature = '111'

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

export default retrieveDashboardKeyWithPass