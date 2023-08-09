import { CollectionsState, CollectionsActions } from './types'
import { Constants } from './constants'
import {
  TCollection,
  TCollectionToken
} from 'types'

const collectionTokens: TCollectionToken[] = [{
  name: 'Raffle Participatiom Pass',
  description: 'Here’s the Raffle Pass, all owners will be eligible to participate in our amazing upcoming campaign in collaboration with top web3 brands',
  copies: 100,
  properties: {
    'Event': 'Raffle',
    'Type': 'Pass'
  },
  token_id: '1',
  thumbnail: 'https://i.seadn.io/gae/NZ0WI9Fxr69mfjNye3t2Ct_Uk-JnPTqWoA7TF4RK18wslgZkR2I1WJ1Uw6PzLK9oj-r02r5r30VR7TVNYqidtg4b75rBqD5p7E1S9g?auto=format&dpr=1&w=48',
}, {
  name: 'LD Digital Merch',
  description: 'This piece shares that you’re our early adopter!',
  copies: 10,
  properties: {
    'Meaning': 'Early-Adopter Merch',
    'Type': 'Merch'
  },
  token_id: '1',
  thumbnail: 'https://i.seadn.io/gae/NZ0WI9Fxr69mfjNye3t2Ct_Uk-JnPTqWoA7TF4RK18wslgZkR2I1WJ1Uw6PzLK9oj-r02r5r30VR7TVNYqidtg4b75rBqD5p7E1S9g?auto=format&dpr=1&w=48',
}]

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
        return {...state, collections: [ action.payload, ...state.collections ] }
      case Constants.COLLECTIONS_SET_LOADING:
        return {...state, loading: action.payload }
      case Constants.COLLECTIONS_SET_COLLECTIONS:
        return {...state, collections: action.payload }
      
      default:
          return state
    }
}