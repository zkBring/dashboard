import { Dispatch } from 'redux'
import * as actionsDispensers from '../actions'
import { DispensersActions } from '../types'
import { RootState } from 'data/store'
import { dispensersApi } from 'data/api'
import { alertError } from 'helpers'
import { TDispenser } from 'types'
import { encrypt } from 'lib/crypto'

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
    const { user: { sdk, dashboardKey } } = getState()
    dispatch(actionsDispensers.setLoading(true))
    if (!dashboardKey) {
      throw new Error('dashboardKey is not provided')
    }
    try {
      const generatedAccount = sdk?.utils.generateAccount(12, true)
      if (generatedAccount) {
        const { address: linkId, privateKey: linkKey, shortCode } = generatedAccount
        const encryptedMultiscanQRSecret = encrypt(linkKey, dashboardKey)
        const encryptedMultiscanQREncCode = encrypt(shortCode, dashboardKey)
        const dispenserId = String(+new Date())
        const newDispenser: TDispenser = {
          encrypted_multiscan_qr_secret: encryptedMultiscanQRSecret,
          multiscan_qr_id: linkId,
          claim_links_count: 0,
          dispenser_id: dispenserId,
          claim_duration: duration,
          created_at: new Date().toString(),
          claim_start: date,
          status: 'READY',
          encrypted_multiscan_qr_enc_code: encryptedMultiscanQREncCode,
          title
        }
        // const { data } = await dispensersApi.create(newDispenser)
        // if (data.success) {
        //   dispatch(actionsDispensers.addDispenser(newDispenser))
        //   if (callback) { callback(data.dispenser.dispenser_id) }
        // }
        dispatch(actionsDispensers.addDispenser(newDispenser))
        if (callback) { callback(dispenserId) }
      }
      
    } catch (err) {
      alertError('Couldn’t create Dispanser, please check console')
      console.error(err)
    }
    dispatch(actionsDispensers.setLoading(false))
  }
}

export default addDispenser