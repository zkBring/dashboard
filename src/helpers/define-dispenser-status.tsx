import { TDispenserStatus } from 'types'

type TDefineDispenserStatus = (
  claim_start: number,
  claim_duration: number,
  links_count: number,
  active?: boolean,
  redirect_on?: boolean,
  redirect_url?: string | null
) => TDispenserStatus

const defineDispenserStatus: TDefineDispenserStatus = (
  claim_start,
  claim_duration,
  links_count,
  active = true,
  redirect_on = false,
  redirect_url
) => {

  const currentDate = +new Date()
  if (redirect_on && redirect_url) {
    console.log('here')
    return 'REDIRECT'
  }
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