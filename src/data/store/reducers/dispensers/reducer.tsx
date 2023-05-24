import { DispensersState, DispensersActions } from './types'
import { Constants } from './constants'
import { TDispenser } from 'types'


const initialState: DispensersState = {
  dispensers: [],
  loading: false,
  mappingLoader: 0
}

export function dispensersReducer(
  state: DispensersState = initialState,
  action: DispensersActions
): DispensersState {
    switch (action.type) {
      case Constants.DISPENSERS_ADD_NEW_DISPENSER:
        return {...state, dispensers: [ ...state.dispensers, action.payload ] }
      case Constants.DISPENSERS_SET_LOADING:
        return {...state, loading: action.payload }
      case Constants.DISPENSERS_SET_DISPENSERS:
        return {...state, dispensers: action.payload }
      case Constants.DISPENSERS_SET_MAPPING_LOADER:
      return {...state, mappingLoader: action.payload.mappingLoader }
      
      default:
          return state;
    }
}