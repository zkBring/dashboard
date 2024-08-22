import { Dispatch } from 'redux'
import * as actionsQR from '../actions'
import { QRsActions } from '../types'
import { RootState } from 'data/store'
import { downloadBase64FilesAsZip } from 'helpers'
import { TQRItem } from "types"
import {
  alertError,
  downloadQRsAsCSV as downloadQRsAsCSVHelper
} from 'helpers'
import { Remote } from 'comlink'
import { QRsWorker } from 'web-workers/qrs-worker'
import { plausibleApi } from 'data/api'
import * as actionsAsyncUser from '../../user/async-actions'

const downloadQRsAsCSV = (
  id: string
) => {
  return async (
    dispatch: Dispatch<QRsActions>,
    getState: () => RootState
  ) => {
    dispatch(actionsQR.setLoading(true))

    const {
      user: {
        dashboardKey,
        workersCount,
        address,
        chainId,
        provider
      },
      qrs: {
        qrs
      }
    } = getState()

    const currentQRSet = qrs.find(qr => String(qr.set_id) === id)

    if (!currentQRSet) {
      dispatch(actionsQR.setLoading(false))
      return alertError('QR set not found')
    }

    if (!dashboardKey) {
      alert('create or retrieve dashboard key STARTED')
      // @ts-ignore
      const dashboardKeyCreated = await actionsAsyncUser.getDashboardKey(
        dispatch,
        chainId as number,
        address,
        provider,
        false
      )
      if (dashboardKeyCreated !== undefined) {
        // @ts-ignore
        dashboardKey = dashboardKeyCreated
      }
      alert('create or retrieve dashboard key FINISHED')
      if (!dashboardKey) {
        alertError('Dashboard Key is not available')
        return dispatch(actionsQR.setLoading(false))
      }
    }

    try {
      const {
        qr_array,
        set_name,
        created_at
      } = currentQRSet

      if (!qr_array) {
        alertError('QR array is not available')
        return dispatch(actionsQR.setLoading(false))
      }

      downloadQRsAsCSVHelper(
        qr_array,
        set_name,
        dashboardKey,
        address,
        created_at
      )
      
    } catch (err) {
      alertError('check console for more information')
      console.error(err)
    }
    dispatch(actionsQR.setLoading(false))
  }
}

export default downloadQRsAsCSV