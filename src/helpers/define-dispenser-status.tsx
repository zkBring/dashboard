import { TDispenserStatus } from 'types'

type TDefineDispenserStatus = (
  claim_start: number,
  claim_duration: number,
  links_count: number
) => TDispenserStatus

const defineDispenserStatus: TDefineDispenserStatus = (
  claim_start,
  claim_duration,
  links_count
) => {
  const currentDate = +new Date()
  if (currentDate > (claim_start + claim_duration * 60 * 1000)) {
    return 'FINISHED'
  }
  if (links_count === 0) {
    return 'NOT_UPLOADED'
  }
  if (currentDate > claim_start) {
    return 'ACTIVE'
  }
  return 'READY'
}

export default defineDispenserStatus