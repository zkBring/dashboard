import { CollectionsState, CollectionsActions } from './types'
import { Constants } from './constants'
import {
  TCollection
} from 'types'

const collections: TCollection[] = [
  {
    title: 'Test collection',
    collection_id: '1',
    symbol: 'JPFTA',
    thumbnail: 'https://i.seadn.io/gae/NZ0WI9Fxr69mfjNye3t2Ct_Uk-JnPTqWoA7TF4RK18wslgZkR2I1WJ1Uw6PzLK9oj-r02r5r30VR7TVNYqidtg4b75rBqD5p7E1S9g?auto=format&dpr=1&w=48',
    address: '0x0553aDA5829184A7818dC866367D77334183603E',
    sbt: false,
    tokenType: 'ERC1155',
    tokens: [],
    tokens_amount: 1000,
    created_at: 'Wed Aug 02 2023 14:37:57 GMT+0200 (Central European Summer Time)'
  },
  {
    title: 'Test collection2',
    collection_id: '2',
    symbol: 'JPFTA2',
    thumbnail: 'https://i.seadn.io/gae/NZ0WI9Fxr69mfjNye3t2Ct_Uk-JnPTqWoA7TF4RK18wslgZkR2I1WJ1Uw6PzLK9oj-r02r5r30VR7TVNYqidtg4b75rBqD5p7E1S9g?auto=format&dpr=1&w=48',
    address: '0x0553aDA5829184A7818dC866367D77334183603E',
    sbt: false,
    tokenType: 'ERC1155',
    tokens: [],
    tokens_amount: 0,
    created_at: 'Wed Aug 02 2023 14:37:57 GMT+0200 (Central European Summer Time)'
  }
]

const initialState: CollectionsState = {
  collections: collections,
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