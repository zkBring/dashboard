import { CampaignState, CampaignActions } from './types';
import { Constants } from './constants';

const initialState: CampaignState = {
  title: '',
  tokenAddress: '',
  loading: false,
  tokenStandard: null,
  decimals: null,
  assets: null,
  assetsOriginal: null,
  symbol: null,
  wallet: null,
  proxyContractAddress: null,
  approved: null,
  id: null,
  secured: false,
  signerKey: null,
  signerAddress: null,
  sponsored: true,
  claimPattern: 'transfer',
  sdk: false,
  links: [],
  nativeTokensPerLink: null,
  onlyPreferredWallet: false,
  linksGenerateLoader: 0
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
        case Constants.CAMPAIGN_SET_LOADING:
          return {...state, loading: action.payload.loading }
        case Constants.CAMPAIGN_SET_TOKEN_STANDARD:
          return {...state, tokenStandard: action.payload.tokenStandard }
        case Constants.CAMPAIGN_SET_DECIMALS:
          return {...state, decimals: action.payload.decimals }
        case Constants.CAMPAIGN_SET_ASSETS:
          return {...state, assets: action.payload.assets }
        case Constants.CAMPAIGN_SET_ASSETS_ORIGINAL:
          return {...state, assetsOriginal: action.payload.assetsOriginal }
        case Constants.CAMPAIGN_SET_SYMBOL:
          return {...state, symbol: action.payload.symbol }
        case Constants.CAMPAIGN_SET_WALLET:
          return {...state, wallet: action.payload.wallet }
        case Constants.CAMPAIGN_SET_PROXY_CONTRACT_ADDRESS:
          return {...state, proxyContractAddress: action.payload.proxyContractAddress }
        case Constants.CAMPAIGN_SET_SDK:
          return {...state, sdk: action.payload.sdk }
        case Constants.CAMPAIGN_SET_APPROVED:
          return {...state, approved: action.payload.approved }
        case Constants.CAMPAIGN_SET_SECURED:
          return {...state, secured: action.payload.secured }
        case Constants.CAMPAIGN_SET_ID:
          return {...state, id: action.payload.id }
        case Constants.CAMPAIGN_SET_SIGNER_KEY:
          return {...state, signerKey: action.payload.signerKey }
        case Constants.CAMPAIGN_SET_SIGNER_ADDRESS:
          return {...state, signerAddress: action.payload.signerAddress }
        case Constants.CAMPAIGN_SET_SPONSORED:
          return {...state, sponsored: action.payload.sponsored }
        case Constants.CAMPAIGN_SET_CLAIM_PATTERN:
          return {...state, claimPattern: action.payload.claimPattern }
        case Constants.CAMPAIGN_SET_NATIVE_TOKENS_PER_LINK:
          return {...state, nativeTokensPerLink: action.payload.nativeTokensPerLink }
        case Constants.CAMPAIGN_SET_ONLY_PREFERRED_WALLET:
          return {...state, onlyPreferredWallet: action.payload.onlyPreferredWallet }
        case Constants.CAMPAIGN_SET_LINKS:
          return {...state, links: [
            ...state.links,
            action.payload
          ]}
        case Constants.CAMPAIGN_SET_LINKS_GENERATE_LOADER:
          return {...state, linksGenerateLoader: action.payload.linksGenerateLoader }
        case Constants.CAMPAIGN_CLEAR:
          return initialState
        default:
          return state;
    }
}