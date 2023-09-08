import { TDispenserStatus } from 'types'
import defineDispenserStatusName from './define-dispenser-status-name'
import { Tag } from 'components/common'

const defineCollectionStatusTag = (tokens_amount: string) => {
  if (tokens_amount && tokens_amount !== '0') { return tokens_amount }
  return <Tag status='info' title='No tokens yet' />
}

export default defineCollectionStatusTag