import { Dispatch } from 'redux'
import * as actionsQR from '../actions'
import { QRsActions } from '../types'
import { RootState } from 'data/store'
import { TQRSet } from 'types'
import { qrsApi } from 'data/api'
import { prepareQRArray } from 'helpers'

const addQRSet = ({
  title,
  quantity,
  callback
}: {
  title: string,
  quantity: number,
  callback?: (id: string | number) => void,
}) => {
  return async (
    dispatch: Dispatch<QRsActions>,
    getState: () => RootState
  ) => {
    const { user: { address, dashboardKey } } = getState()
    try {
      if (!dashboardKey) { throw new Error('No dashboardKey found') }
      dispatch(actionsQR.setLoading(true))
      
      const qrArray = prepareQRArray(quantity, dashboardKey)
      const newQr: TQRSet = {
        set_name: title,
        qr_quantity: quantity,
        status: 'NOT_SENT_TO_PRINTER',
        creator_address: address,
        qr_array: qrArray
      }
  
      const result = await qrsApi.create(newQr)
      if (result.data.success) {
        dispatch(actionsQR.addQr(result.data.qr_set))
        callback && callback(result.data._id)
      }
    } catch (err) {
      console.error(err)
    }
    dispatch(actionsQR.setLoading(false))
  }
}

export default addQRSet