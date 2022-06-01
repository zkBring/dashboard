import { Dispatch } from 'redux'
import * as actionsQR from '../actions'
import { QRsActions } from '../types'
import { RootState } from 'data/store'
import { TQR } from 'types'

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
    const id = +(new Date())
    const newQr: TQR = {
      id,
      title,
      quantity,
      status: 'way_to_warehouse'
    }
    dispatch(actionsQR.addQr(newQr))
    callback && callback(id)
  }
}

export default addQR