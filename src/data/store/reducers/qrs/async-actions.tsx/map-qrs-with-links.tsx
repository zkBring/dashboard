import { Dispatch } from 'redux'
import * as actionsQR from '../actions'
import { QRsActions } from '../types'
import { RootState } from 'data/store'
import { TQRItem, TLinkDecrypted } from 'types'
import { qrsApi } from 'data/api'
import { mapQRsWithLinks } from 'helpers'

const mapQRsWithLinksAction = ({
  setId,
  links,
  qrs,
  callback
}: {
  setId: string,
  links: TLinkDecrypted[],
  qrs: TQRItem[],
  callback?: () => void,
}) => {
  return async (
    dispatch: Dispatch<QRsActions>,
    getState: () => RootState
  ) => {
    const { qrs: { qrs: qrSets }, user: { dashboardKey } } = getState()
    try {
      if (!dashboardKey) {
        throw new Error('dashboardKey is not provided')
      }
      dispatch(actionsQR.setLoading(true))
      const qrArrayMapped = mapQRsWithLinks(qrs, links, dashboardKey)
      const result = await qrsApi.mapLinks(setId, qrArrayMapped)
      if (result.data.success) {
        const qrsUpdated = qrSets.map(item => {
          if (item.set_id === setId) {
            return {
              ...item,
              links_uploaded: true
            }
          }
          return item
        })
        dispatch(actionsQR.updateQrs(qrsUpdated))
        callback && callback()
      }
    } catch (err) {
      console.error(err)
    }
    dispatch(actionsQR.setLoading(false))
  }
}

export default mapQRsWithLinksAction