
import { Dispatch } from 'redux';
import * as actionsCollections from '../actions'
import { CollectionsActions } from '../types'
import { UserActions } from '../../user/types'
import { IAppDispatch } from 'data/store'
import {  defineThirdwebNetworkName, alertError } from 'helpers'
import { RootState } from 'data/store'
import { ThirdwebSDK } from '@thirdweb-dev/sdk'
import { collectionsApi } from 'data/api'
import { TCollection, TClaimPattern, TCollectionToken } from 'types'

const { REACT_APP_THIRDWEB_CLIENT_ID } = process.env

function getCollectionData (
  collectionId: string,
  callback?: () => void
) {
  // @ts-ignore
  return async (
    dispatch: Dispatch<CollectionsActions> & Dispatch<UserActions> & IAppDispatch,
    getState: () => RootState
  ) => {
    dispatch(actionsCollections.setLoading(true))
    const { user: { chainId }, collections: { collections } } = getState()

    try {
      const tokenData: { data: { success: boolean, tokens: TCollectionToken[] }} = await collectionsApi.getOne(collectionId)
      if (tokenData.data.success) {
        const collectionsUpdated = collections.map(collection => {
          if (collection.collection_id === collectionId) {
            collection.tokens = tokenData.data.tokens
          }
          return collection
        })
        dispatch(actionsCollections.setCollections(collectionsUpdated))
      } 
    } catch (err) {
      console.error({
        err
      })
      alertError('Some error occured. Please check console for more info')
    }
    dispatch(actionsCollections.setLoading(false))
  }
}

export default getCollectionData
