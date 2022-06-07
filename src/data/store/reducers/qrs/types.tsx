import { ActionType } from 'typesafe-actions';
import * as actions from './actions'
import { TQRSet } from 'types'

export interface QRsState {
  qrs: TQRSet[],
  loading: boolean
}

export type QRsActions = ActionType<typeof actions>;