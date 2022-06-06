import { action } from 'typesafe-actions';
import { Constants } from './constants';
import { TQR } from 'types'

export function addQr(qr: TQR) {
  return action(Constants.QRS_ADD_NEW_QR, qr)
}

export function updateQrs(qrs: TQR[]) {
  return action(Constants.QRS_UPDATE_QRS, qrs)
}

export function setLoading(loading: boolean) {
  return action(Constants.QRS_SET_LOADING, loading)
}