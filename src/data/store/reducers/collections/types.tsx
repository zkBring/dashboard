import { ActionType } from 'typesafe-actions'
import * as actions from './actions'
import { TCollection } from 'types'

export interface CollectionsState {
  collections: TCollection[],
  loading: boolean
}

export type CollectionsActions = ActionType<typeof actions>