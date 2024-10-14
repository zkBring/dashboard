import { TCollectionStatus } from 'types'

const defineCollectionStatusName = (status: TCollectionStatus) => {
  switch (status) {
    case 'ACTIVE' :
      return 'Active'
    case 'ADD_TOKENS':
      return 'Add tokens'
    case 'CREATE_LINKS':
      return 'Create links'
    case 'ARCHIVED':
      return 'Archived'
    default:
      return 'Loading'
  }
}

export default defineCollectionStatusName