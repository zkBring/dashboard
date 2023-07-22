import { Dispatch } from 'redux'
import * as actionsDispensers from '../actions'
import { DispensersActions } from '../types'
import { RootState } from 'data/store'
import { dispensersApi } from 'data/api'
import { alertError } from 'helpers'
import { plausibleApi } from 'data/api'
import { decrypt, encrypt } from 'lib/crypto'
import { ethers } from 'ethers'

type TUpdateRedirectURLArgs = {
  dispenser_id: string
  redirect_url: string
  encrypted_multiscan_qr_enc_code: string
  successCallback: () => void
  errorCallback: () => void
}

const updateRedirectURL = ({
  dispenser_id,
  redirect_url,
  encrypted_multiscan_qr_enc_code,
  successCallback,
  errorCallback
}: TUpdateRedirectURLArgs) => {
  return async (
    dispatch: Dispatch<DispensersActions>,
    getState: () => RootState
  ) => {
    const { user: { address, dashboardKey }, dispensers: { dispensers } } = getState()
    dispatch(actionsDispensers.setLoading(true))
    try {
      const multiscanQREncCode = decrypt(encrypted_multiscan_qr_enc_code, dashboardKey as string)
      const linkKey = ethers.utils.id(multiscanQREncCode)
      const redirectLinkEncrypted = encrypt(redirect_url, linkKey.replace('0x', ''))
      const { data } : { data: { success: boolean } } = await dispensersApi.updateRedirectUrl({ dispenser_id, redirect_url: redirectLinkEncrypted })
      if (data.success) {
        const dispensersUpdated = dispensers.map(item => {
          if (item.dispenser_id === dispenser_id) { 
            return { ...item, redirect_url: redirectLinkEncrypted }
          }
          return item
        })
        plausibleApi.invokeEvent({
          eventName: 'multiqr_update_redirect_url',
          data: {
            success: 'yes',
            address,
            newRedirectURLValue: redirect_url,
            dispenserId: dispenser_id
          }
        })
        dispatch(actionsDispensers.setDispensers(dispensersUpdated))
        if (successCallback) { successCallback() }
      } else {
        plausibleApi.invokeEvent({
          eventName: 'multiqr_update_redirect_url',
          data: {
            success: 'no',
            address,
            newRedirectURLValue: redirect_url,
            dispenserId: dispenser_id
          }
        })
        if (errorCallback) { errorCallback() }
        return alertError('Dispenser was not updated. Check console for more information')
      }
      
    } catch (err) {
      plausibleApi.invokeEvent({
        eventName: 'multiqr_update_redirect_url',
        data: {
          success: 'no',
          address,
          newRedirectURLValue: redirect_url,
          dispenserId: dispenser_id
        }
      })
      if (errorCallback) { errorCallback() }
      alertError('Dispenser was not updated. Check console for more information')
      console.error(err)
    }
    dispatch(actionsDispensers.setLoading(false))
  }
}

export default updateRedirectURL