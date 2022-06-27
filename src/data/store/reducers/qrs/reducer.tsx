import { QRsState, QRsActions } from './types'
import { Constants } from './constants'

const initialState: QRsState = {
  qrs: [],
  loading: false,
  downloadItems: []
}

export function qrsReducer(
  state: QRsState = initialState,
  action: QRsActions
): QRsState {
    switch (action.type) {
      case Constants.QRS_ADD_NEW_QR:
        return {...state, qrs: [ ...state.qrs, action.payload ] }
      case Constants.QRS_UPDATE_QRS:
        return {...state, qrs: action.payload }
      case Constants.QRS_SET_LOADING:
        return {...state, loading: action.payload }
      case Constants.QRS_SET_DOWNLOAD_ITEMS:
        return {...state, downloadItems: action.payload }
      default:
          return state;
    }
}