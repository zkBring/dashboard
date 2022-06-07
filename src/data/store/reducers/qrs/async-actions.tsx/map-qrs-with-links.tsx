import { Dispatch } from 'redux'
import * as actionsQR from '../actions'
import { QRsActions } from '../types'
import { RootState } from 'data/store'
import { TQRSet, TQRItem, TLink } from 'types'
import { qrsApi } from 'data/api'
import { mapQRsWithLinks } from 'helpers'

const mapQRsWithLinksAction = ({
  setId,
  links,
  qrs,
  callback
}: {
  setId: string,
  links: TLink[],
  qrs: TQRItem[],
  callback?: () => void,
}) => {
  return async (
    dispatch: Dispatch<QRsActions>
  ) => {
    try {
      dispatch(actionsQR.setLoading(true))
      const qrArrayMapped = mapQRsWithLinks(qrs, links)
      const result = await qrsApi.mapLinks(setId, qrArrayMapped)
      if (result.data.success) {
        console.log(result.data)
        callback && callback()
      }
    } catch (err) {
      console.error(err)
    }
    dispatch(actionsQR.setLoading(false))
  }
}

export default mapQRsWithLinksAction