import { Dispatch } from 'redux'
import * as userActions from '../actions'

import {
  UserActions,
} from '../types'
import {
  CampaignActions
} from 'data/store/reducers/campaign/types'
import { RootState, IAppDispatch } from 'data/store'
import { authorizationApi, dashboardKeyApi, plausibleApi } from 'data/api'
import { ethers } from 'ethers'
import { encrypt, decrypt, generateKeyPair } from 'lib/crypto' 
import { toString } from "uint8arrays/to-string"
import { sleep, defineNetworkName } from 'helpers'
import {
  initialization
} from './index'

const authorize = (
  address: string
) => {
  return async (
    dispatch: Dispatch<UserActions> & Dispatch<CampaignActions>  & IAppDispatch,
    getState: () => RootState
  ) => {
    const {
      user: {
        provider,
        address,
        chainId
      }
    } = getState()
    dispatch(userActions.setLoading(true))

    const timestamp = Date.now()
    const humanReadable = new Date(timestamp).toUTCString()
    
    try {
      const signer = await provider.getSigner()
      const message = `I'm signing this message to login to Linkdrop Dashboard at ${humanReadable}`
      
      try {
        const sig = await signer.signMessage(message)
        await authorizationApi.authorize(
          message,
          timestamp,
          sig,
          address.toLocaleUpperCase()
        )
      } catch (err) {
        plausibleApi.invokeEvent({
          eventName: 'sign_in_signature_reject',
          data: {
            signature: 'login'
          }
        })
        throw new Error('Rejected to sign message')
      }
      
      dispatch(userActions.setAuthorizationStep('store-key'))
      dispatch(initialization())

      // dashboard key 
      const dashboardKeyData = await dashboardKeyApi.get()
      const { encrypted_key, sig_message, key_id } = dashboardKeyData.data
      if (!encrypted_key) {
        // register
        const result = await createDashboardKey(
          signer,
          sig_message
        )

        if (result) {
          const {
            dashboard_key,
            encrypted_dashboard_key
          } = result 
          if (encrypted_dashboard_key && dashboard_key) {
            const { data: { success } } = await dashboardKeyApi.create(
              encrypted_dashboard_key,
              key_id
            )
            if (success) {
              dispatch(userActions.setDashboardKey(dashboard_key))
            }
          }
        } else {
          throw new Error('Rejected to create Dashboard key')
        }

      } else {
        const decrypted_dashboard_key = await retrieveDashboardKey(
          signer,
          encrypted_key,
          sig_message
        )
        if (decrypted_dashboard_key) {
          dispatch(userActions.setDashboardKey(decrypted_dashboard_key))
        } else {
          throw new Error('Rejected to retrieve Dashboard key')
        }
      }

      plausibleApi.invokeEvent({
        eventName: 'sign_in_step2',
        data: {
          network: defineNetworkName(chainId)
        }
      })

      await sleep(1000)
      dispatch(userActions.setLoading(false))
      dispatch(userActions.setAuthorizationStep('authorized'))
      return message
    } catch (err) {
      dispatch(userActions.setAuthorizationStep('connect'))
      console.error({ err })
      alert('Authorization was declined')
      dispatch(userActions.setLoading(false))
      return null
    }
  }
}


const createDashboardKey: (signer: any, sig_message: string) => Promise<{ dashboard_key: string, encrypted_dashboard_key: string } | void> = async (
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

export default authorize
