import { QRsState, QRsActions } from './types'
import { Constants } from './constants'

const initialState: QRsState = {
  qrs: [
    {
      title: 'NFT Berlin event',
      id: 1,
      amount: 1000,
      status: 'ready_to_ship'
    }, {
      title: 'Adidas',
      id: 2,
      amount: 1000,
      status: 'inserted_to_boxes'
    }, {
      title: 'Sesame street',
      id: 3,
      amount: 4,
      status: 'sent_to_printer'
    }, {
      title: 'Cologne',
      id: 4,
      amount: 610,
      status: 'ready_to_ship'
    }
  ]
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
      default:
          return state;
    }
}