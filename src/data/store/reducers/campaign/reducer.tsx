import { CampaignState, CampaignActions } from './types';
import { Constants } from './constants';

const initialState: CampaignState = {
  title: '',
  tokenAddress: '',
  logoURL: '',
  description: '',
  loading: false,
  type: null,
  decimals: null,
  assets: null,
}

export function newRetroDropReducer(
  state: CampaignState = initialState,
  action: CampaignActions
): CampaignState {
    switch (action.type) {
        case Constants.CAMPAIGN_SET_TOKEN_ADDRESS:
          return {...state, tokenAddress: action.payload.tokenAddress }
        case Constants.CAMPAIGN_SET_TITLE:
          return {...state, title: action.payload.title }
        case Constants.CAMPAIGN_SET_DESCRIPTION:
          return {...state, description: action.payload.description }
        case Constants.CAMPAIGN_SET_LOGO_URL:
          return {...state, logoURL: action.payload.logoURL }
        case Constants.CAMPAIGN_SET_LOADING:
          return {...state, loading: action.payload.loading }
        case Constants.CAMPAIGN_SET_TYPE:
          return {...state, type: action.payload.type }
        case Constants.CAMPAIGN_SET_DECIMALS:
          return {...state, decimals: action.payload.decimals }
        case Constants.CAMPAIGN_CLEAR_NEW_RETRODROP:
          return initialState
        default:
          return state;
    }
}