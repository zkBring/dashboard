import { action } from 'typesafe-actions'
import { Constants } from './constants'
import { TCollection } from 'types'

export function addCollection(collection: TCollection) {
  return action(Constants.COLLECTIONS_ADD_NEW_COLLECTION, collection)
}

export function setCollections(collections: TCollection[]) {
  return action(Constants.COLLECTIONS_SET_COLLECTIONS, collections)
}

export function setLoading(loading: boolean) {
  return action(Constants.COLLECTIONS_SET_LOADING, loading)
}
