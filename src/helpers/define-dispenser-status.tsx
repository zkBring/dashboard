import { TDispenserStatus } from 'types'

type TDefineDispenserStatus = (
  claim_start: number,
  claim_duration: number,
  links_count: number,
  active?: boolean
) => TDispenserStatus

const defineDispenserStatus: TDefineDispenserStatus = (
  claim_start,
  claim_duration,
  links_count,
  active = true
) => {
  const currentDate = +new Date()
  if (currentDate > (claim_start + claim_duration * 60 * 1000)) {
    return 'FINISHED'
  }
  if (links_count === 0) {
    return 'NOT_UPLOADED'
  }
  if (!active) {
    return 'PAUSED'
  }
  if (currentDate > claim_start) {
    return 'ACTIVE'
  }
  return 'READY'
}

export default defineDispenserStatus