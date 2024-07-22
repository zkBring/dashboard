import { TDispenserStatus } from 'types'
import defineDispenserStatusName from './define-dispenser-status-name'
import { Tag } from 'components/common'

const defineDispenserStatusTag = (status: TDispenserStatus) => {
  const statusName = defineDispenserStatusName(status)
  switch (status) {
    case 'ACTIVE':
      return <Tag status='success' title={statusName} />
    case 'PAUSED':
    case 'READY':
    case 'NOT_UPLOADED':
      return <Tag status='info' title={statusName} />
    case 'FINISHED':
    case 'REDIRECT':
      return <Tag status='default' title={statusName} />
  }
}

export default defineDispenserStatusTag