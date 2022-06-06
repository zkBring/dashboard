import { Dispatch } from 'redux'
import * as actionsQR from '../actions'
import { QRsActions } from '../types'
import { RootState } from 'data/store'
import { TQR } from 'types'
import { qrsApi } from 'data/api'

const addQR = ({
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
    const { user: { address } } = getState()
    try {
      dispatch(actionsQR.setLoading(true))
      const newQr: TQR = {
        setName: title,
        qrQuantity: quantity,
        status: 'NOT_SENT_TO_PRINTER',
        creatorAddress: address
      }
  
      const result = await qrsApi.create(newQr)
      if (result.data.success) {
        dispatch(actionsQR.addQr(newQr))
        callback && callback(result.data._id)
      }
    } catch (err) {
      console.error(err)
    }
    dispatch(actionsQR.setLoading(false))
  }
}

export default addQR