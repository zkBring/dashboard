import { Dispatch } from 'redux'
import * as actionsQR from '../actions'
import { QRsActions } from '../types'
import { RootState } from 'data/store'
import { qrsApi } from 'data/api'
import {
  sleep,
  createQuantityGroups,
  createWorkers,
  terminateWorkers,
  alertError
} from 'helpers'
import { QRsWorker } from 'web-workers/qrs-worker'
import { Remote } from 'comlink';
import { plausibleApi } from 'data/api'
import * as qrManagerActions from '../../qr-manager/actions'
import { QRManagerActions } from '../../qr-manager/types'
import * as actionsAsyncUser from '../../user/async-actions'

const updateQRSetQuantity = ({
  setId,
  quantity,
  callback
}: {
  setId: string | number,
  quantity: number,
  callback?: () => void,
}) => {
  return async (
    dispatch: Dispatch<QRsActions> & Dispatch<QRManagerActions>,
    getState: () => RootState
  ) => {
    dispatch(actionsQR.setLoading(true))

    const {
      qrs: {
        qrs
      },
      user: {
        dashboardKey,
        workersCount,
        chainId,
        address,
        provider
      },
      qrManager: {
        items
      }
    } = getState()
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
      const start = +(new Date())
      let currentPercentage = 0
      const neededWorkersCount = quantity <= 1000 ? 1 : workersCount

      
      const updateProgressbar = async (value: number) => {
        if (value === currentPercentage || value < currentPercentage) { return }
        currentPercentage = value
        dispatch(actionsQR.setUploadLoader(currentPercentage))
        await sleep(1)
      }

      const quantityGroups = createQuantityGroups(quantity, neededWorkersCount)
      const workers = await createWorkers(
        quantityGroups,
        'qrs',
        updateProgressbar
      )
      
      const qrArray = await Promise.all(workers.map(({
        worker,
        data
      }) => (worker as Remote<QRsWorker>).prepareQRs(data as number, dashboardKey)))
      console.log({ qrArray })

      console.log((+ new Date()) - start)
      terminateWorkers(workers)

      const result = await qrsApi.updateQuantity(setId, qrArray.flat(), quantity)
      
      if (result && result.data && result.data.success) {
        plausibleApi.invokeEvent({
          eventName: 'qr_upd_quantity'
        })
        const qrsUpdated = qrs.map(item => {
          if (item.set_id === setId) {
            return {
              ...item,
              qr_array: result.data.qr_array,
              qr_quantity: quantity
            }
          }
          return item
        })
        const qrManagerItemsUpdated = items.map(item => {
          if (item.item_id === setId) { 
            return {
              ...item,
              links_count: quantity
            }
          }
          return item
        })
        dispatch(actionsQR.setUploadLoader(0))
        dispatch(actionsQR.updateQrs(qrsUpdated))
        dispatch(qrManagerActions.setItems(qrManagerItemsUpdated))

        callback && callback()
      }
    } catch (err) {
      console.error(err)
    }
    dispatch(actionsQR.setLoading(false))
  }
}


export default updateQRSetQuantity