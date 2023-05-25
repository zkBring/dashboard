import { Dispatch } from 'redux'
import * as actionsDispensers from '../actions'
import { DispensersActions } from '../types'
import { RootState } from 'data/store'
import { dispensersApi } from 'data/api'
import { alertError } from 'helpers'
import { TDispenser } from 'types'
import { encrypt } from 'lib/crypto'
import { plausibleApi } from 'data/api'

type TAddDispenserArgs = {
  title: string,
  date: string,
  duration: number,
  callback?: (id: string | number) => void,
}

const addDispenser = ({
  title,
  date,
  duration,
  callback
}: TAddDispenserArgs) => {
  return async (
    dispatch: Dispatch<DispensersActions>,
    getState: () => RootState
  ) => {
    const { user: { sdk, dashboardKey, address } } = getState()
    dispatch(actionsDispensers.setLoading(true))
    if (!dashboardKey) {
      throw new Error('dashboardKey is not provided')
    }
    try {
      const secretKeyPair = sdk?.utils.generateAccount(12, true)
      const encKeyPair = sdk?.utils.generateAccount(12, true)
      if (!secretKeyPair) { return alertError('secretKeyPair is not provided') }
      if (!encKeyPair) { return alertError('encKeyPair is not provided') }
        
      const encryptedMultiscanQRSecret = encrypt(secretKeyPair.shortCode, dashboardKey)
      const encryptedMultiscanQREncCode = encrypt(encKeyPair.shortCode, dashboardKey)
      const dispenserId = String(+new Date())
      const newDispenser: TDispenser = {
        encrypted_multiscan_qr_secret: encryptedMultiscanQRSecret,
        multiscan_qr_id: secretKeyPair.address,
        links_count: 0,
        dispenser_id: dispenserId,
        claim_duration: duration,
        claim_start: +(new Date(date)),
        encrypted_multiscan_qr_enc_code: encryptedMultiscanQREncCode,
        title
      }


      const { data } = await dispensersApi.create(newDispenser)
      if (data.success) {
        dispatch(actionsDispensers.addDispenser(data.dispenser))
        plausibleApi.invokeEvent({
          eventName: 'multiqr_add',
          data: {
            success: 'yes',
            address
          }
        })
        if (callback) { callback(data.dispenser.dispenser_id) }
      } else {
        plausibleApi.invokeEvent({
          eventName: 'multiqr_add',
          data: {
            success: 'no',
            address
          }
        })
        return alertError('Dispenser was not created. Check console for more information')
      }
    } catch (err) {
      plausibleApi.invokeEvent({
        eventName: 'multiqr_add',
        data: {
          success: 'no',
          address
        }
      })
      alertError('Couldn’t create Dispanser, please check console')
      console.error(err)
    }
    dispatch(actionsDispensers.setLoading(false))
  }
}

export default addDispenser