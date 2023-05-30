import { plausibleApi } from 'data/api'
import { ethers } from 'ethers'
import { decrypt } from 'lib/crypto' 
import { toString } from "uint8arrays/to-string"

const retrieveDashboardKey: (
  signer: any,
  encrypted_dashboard_key: string,
  sig_message: string
) => Promise<string | void> = async (
  signer,
  encrypted_dashboard_key,
  sig_message
) => {
  try {
    const signature = await signer.signMessage(sig_message)
    const signature_key = await ethers.utils.id(signature)
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