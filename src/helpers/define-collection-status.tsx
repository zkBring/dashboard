import {
  TCollectionToken,
  TCollectionStatus
} from 'types'

const defineCollectionStatus: (
  loading: boolean,
  tokens?: number,
  campaign_id?: null | string 
) => TCollectionStatus = (
  loading,
  tokens,
  campaign_id
) => {
  if (loading) {
    return 'LOADING'
  }

  if (tokens === 0) {
    return 'ADD_TOKENS'
  }

  if (!campaign_id) {
    return 'CREATE_LINKS'
  }

  return 'ACTIVE'
}

export default defineCollectionStatus