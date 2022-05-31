import { ActionType } from 'typesafe-actions';
import * as actions from './actions'
import { TQR } from 'types'

export interface QRsState {
  qrs: TQR[]
}

export type QRsActions = ActionType<typeof actions>;