import { CollectionsState, CollectionsActions } from './types'
import { Constants } from './constants'

const initialState: CollectionsState = {
  collections: [],
  loading: false
}

export function collectionsReducer(
  state: CollectionsState = initialState,
  action: CollectionsActions
): CollectionsState {
    switch (action.type) {
      case Constants.COLLECTIONS_ADD_NEW_COLLECTION:
        return {...state, collections: [ ...state.collections, action.payload ] }
      case Constants.COLLECTIONS_SET_LOADING:
        return {...state, loading: action.payload }
      case Constants.COLLECTIONS_SET_COLLECTIONS:
        return {...state, collections: action.payload }
      
      default:
          return state
    }
}