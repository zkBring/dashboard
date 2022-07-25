import { Dispatch } from 'redux'
import * as actionsQR from '../actions'
import { QRsActions } from '../types'
import { RootState } from 'data/store'
import { qrsApi } from 'data/api'

const getQRs = ({
  setId
}: {
  setId: string | number,
}) => {
  return async (
    dispatch: Dispatch<QRsActions>,
    getState: () => RootState
  ) => {
    const { qrs: { qrs } } = getState()
    try {
      dispatch(actionsQR.setLoading(true))
      const result = await qrsApi.getQRs(setId)
      if (result.data.success) {
        const qrsUpdated = qrs.map(item => {
          if (item.set_id === setId) {
            return {
              ...item,
              qr_array: result.data.qr_array
            }
          }
          return item
        })
        dispatch(actionsQR.updateQrs(qrsUpdated))
      }
    } catch (err) {
      console.error(err)
    }
    dispatch(actionsQR.setLoading(false))
  }
}

export default getQRs