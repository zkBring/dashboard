import { plausibleApi } from 'data/api'
import { ethers } from 'ethers'
import { encrypt, generateKeyPair } from 'lib/crypto' 
import { toString } from "uint8arrays/to-string"
import { createWalletClient, custom } from 'viem'
import { defineWagmiNetwork } from 'helpers'

const createDashboardKeyWithPass: (
  sig_message: string,
  account: string,
  chain_id: number
  ) => Promise<{
    dashboard_key: string,
    encrypted_dashboard_key: string
  } | void> = async (
  sig_message,
  account,
  chain_id
) => {

  const network = defineWagmiNetwork(chain_id)

  try {

    const challenge = Uint8Array.from(sig_message, c => c.charCodeAt(0))

    console.log({ challenge })

    const user = {
      id: Uint8Array.from(
        account, c => c.charCodeAt(0)),
      name: account,
      displayName: account
    }

    console.log({ user })

    const publicKeyCredentialCreationOptions = {
      challenge: challenge,
      rp: {
        name: "Linkdrop",
        id: window.location.host.includes('localhost') ? 'localhost' : window.location.host,
      },
      user,
      pubKeyCredParams: [{alg: -7, type: "public-key"}],
      authenticatorSelection: {
        authenticatorAttachment: "cross-platform",
      },
      timeout: 60000,
      attestation: 'direct'
    }
  
  const signature = await navigator.credentials.create({
      // @ts-ignore
      publicKey: publicKeyCredentialCreationOptions
  })

  console.log({ signature })


    // const signature_key = ethers.utils.id(signature)
    // const { privateKey: dashboard_key } = generateKeyPair()
    // const signature_key_32 = signature_key.slice(0, 32)
    // const signature_key_uint_8_array = new TextEncoder().encode(signature_key_32)
    // const signature_key_as_base_16 = toString(signature_key_uint_8_array, 'base16')
    // const encrypted_dashboard_key = encrypt(dashboard_key, signature_key_as_base_16)

    return {
      dashboard_key: '1',
      encrypted_dashboard_key: '1'
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

export default createDashboardKeyWithPass