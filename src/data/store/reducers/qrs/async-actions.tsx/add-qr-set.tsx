import { Dispatch } from 'redux'
import * as actionsQR from '../actions'
import { QRsActions } from '../types'
import { RootState } from 'data/store'
import { TQRSet } from 'types'
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
import { plausibleApi, qrManagerApi } from 'data/api'
import * as qrManagerActions from '../../qr-manager/actions'
import { QRManagerActions } from '../../qr-manager/types'
import * as actionsAsyncUser from '../../user/async-actions'

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
    dispatch: Dispatch<QRsActions> & Dispatch<QRManagerActions>,
    getState: () => RootState
  ) => {
    let {
      user: {
        address,
        dashboardKey,
        workersCount,
        chainId,
        provider
      }
    } = getState()
    dispatch(actionsQR.setLoading(true))

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
      let currentPercentage = 0
      const neededWorkersCount = quantity <= 1000 ? 1 : workersCount
      const start = +(new Date())

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

      const newQr: TQRSet = {
        set_name: title,
        qr_quantity: quantity,
        status: 'NOT_SENT_TO_PRINTER',
        creator_address: address,
        qr_array: qrArray.flat(),
        campaign: {
          title: '',
          campaign_id: '1'
        }
      }

      console.log((+ new Date()) - start)
      terminateWorkers(workers)
  
      const result = await qrsApi.create(newQr)
      if (result.data.success) {
        plausibleApi.invokeEvent({
          eventName: 'new_qr_set'
        })

        dispatch(actionsQR.addQr(result.data.qr_set))

        const qrManagerData = await qrManagerApi.get()
        const { success, items } = qrManagerData.data
        if (success) {
          dispatch(qrManagerActions.setItems(items))
        }
      
        dispatch(actionsQR.setUploadLoader(0))
        callback && callback((result.data.qr_set || {}).set_id || '')
      }
    } catch (err) {
      console.error(err)
    }
    dispatch(actionsQR.setLoading(false))
  }
}

export default addQRSet