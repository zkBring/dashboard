import {
  TCollectionStatus
} from 'types'

const defineCollectionStatus: (
  loading: boolean,
  links_count: number,
  tokens_count?: number,
  archived?: boolean
) => TCollectionStatus = (
  loading,
  links_count,
  tokens_count,
  archived
) => {
  if (loading) {
    return 'LOADING'
  }

  if (archived) {
    return 'ARCHIVED'
  }

  if (!tokens_count) {
    return 'ADD_TOKENS'
  }

  if (!links_count) {
    return 'CREATE_LINKS'
  }

  return 'ACTIVE'
}

export default defineCollectionStatus