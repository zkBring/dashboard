import { QRManagerState, QRManagerActions } from './types'
import { Constants } from './constants'

const initialState: QRManagerState = {
  items: [],
  loading: false
}

export function qrManagerReducer(
  state: QRManagerState = initialState,
  action: QRManagerActions
): QRManagerState {
    switch (action.type) {
      case Constants.QR_MANAGER_SET_ITEMS:
        return {...state, items: action.payload }
      case Constants.QR_MANAGER_SET_LOADING:
        return {...state, loading: action.payload }
      default:
          return state;
    }
}