import { Dispatch } from 'redux'
import * as actionsCollections from '../actions'
import { CollectionsActions } from '../types'
import { RootState } from 'data/store'
import { collectionsApi } from 'data/api'

const updateArchived = (
  collection_id: string | number,
  archived: boolean
) => {
  return async (
    dispatch: Dispatch<CollectionsActions>,
    getState: () => RootState
  ) => {
    dispatch(actionsCollections.setLoading(true))
    const {
      collections: {
        collections
      }
    } = getState()
    
    try {
      const result = await collectionsApi.update({
        collection_id,
        archived
      })

      if (result.data.success) {
        const updatedCollections = collections.map(collection => {
          if (collection.collection_id === collection_id) {
            return {
              ...collection,
              archived
            }
          }
          return collection
        })
        dispatch(actionsCollections.setCollections(updatedCollections))
      }
    } catch (err) {
      console.error(err)
    }
    dispatch(actionsCollections.setLoading(false))
  }
}

export default updateArchived