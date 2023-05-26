import { plausibleApi } from 'data/api'
import { ethers } from 'ethers'
import { encrypt, generateKeyPair } from 'lib/crypto' 
import { toString } from "uint8arrays/to-string"


const createDashboardKey: (
  signer: any,
  sig_message: string) => Promise<{
    dashboard_key: string,
    encrypted_dashboard_key: string
  } | void> = async (
  signer,
  sig_message
) => {
  try {
    const signature = await signer.signMessage(sig_message)
    const signature_key = await ethers.utils.id(signature)
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