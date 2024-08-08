import { action } from 'typesafe-actions'
import { Constants } from './constants'
import { TQRManagerItem } from 'types'

export function setItems(items: TQRManagerItem[]) {
  return action(Constants.QR_MANAGER_SET_ITEMS, items)
}

export function setLoading(loading: boolean) {
  return action(Constants.QR_MANAGER_SET_LOADING, loading)
}
