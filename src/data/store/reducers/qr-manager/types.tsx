import { ActionType } from 'typesafe-actions'
import * as actions from './actions'
import {
  TQRManagerItem
} from 'types'

export interface QRManagerState {
  items: TQRManagerItem[]
  loading: boolean
}

export type QRManagerActions = ActionType<typeof actions>