import { TCollectionStatus } from 'types'
import defineCollectionStatusName from './define-collection-status-name'
import { Tag } from 'components/common'

const defineCollectionStatusTag = (status: TCollectionStatus) => {
  const statusName = defineCollectionStatusName(status)
  switch (status) {
    case 'ACTIVE':
      return <Tag status='success' title={statusName} />
    case 'ADD_TOKENS':
    case 'CREATE_LINKS':
      return <Tag status='info' title={statusName} />
    default:
      return <Tag status='default' title={statusName} />
  }
}

export default defineCollectionStatusTag