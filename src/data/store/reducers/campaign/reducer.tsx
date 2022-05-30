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
  symbol: null,
  wallet: null,
  proxyContractAddress: null,
  approved: false,
  id: null,
  secured: false,
  privateKey: null,
  sponsored: false,
  links: []
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
        case Constants.CAMPAIGN_SET_ASSETS:
          return {...state, assets: action.payload.assets }
        case Constants.CAMPAIGN_SET_SYMBOL:
          return {...state, symbol: action.payload.symbol }
        case Constants.CAMPAIGN_SET_WALLET:
          return {...state, wallet: action.payload.wallet }
        case Constants.CAMPAIGN_SET_PROXY_CONTRACT_ADDRESS:
          return {...state, proxyContractAddress: action.payload.proxyContractAddress }
        case Constants.CAMPAIGN_SET_APPROVED:
          return {...state, approved: action.payload.approved }
        case Constants.CAMPAIGN_SET_SECURED:
          return {...state, secured: action.payload.secured }
        case Constants.CAMPAIGN_SET_ID:
          return {...state, id: action.payload.id }
        case Constants.CAMPAIGN_SET_PRIVATE_KEY:
          return {...state, privateKey: action.payload.privateKey }
        case Constants.CAMPAIGN_SET_SPONSORED:
          return {...state, sponsored: action.payload.sponsored }
        case Constants.CAMPAIGN_SET_LINKS:
          return {...state, links: [
            ...state.links,
            action.payload
          ]}
        case Constants.CAMPAIGN_CLEAR:
          return initialState
        default:
          return state;
    }
}