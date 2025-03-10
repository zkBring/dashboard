import { TDispenserStatus } from 'types'

type TDefineDispenserStatus = (
  claim_start: number | null,
  claim_finish: number | null,
  links_count: number,
  active?: boolean,
  redirect_on?: boolean,
  redirect_url?: string | null,
  timeframe_on?: boolean,
  archived?: boolean
) => TDispenserStatus

const defineDispenserStatus: TDefineDispenserStatus = (
  claim_start,
  claim_finish,
  links_count,
  active = true,
  redirect_on = false,
  redirect_url,
  timeframe_on = false,
  archived
) => {

  if (archived) {
    return 'ARCHIVED'
  }

  if (links_count === 0) {
    return 'NOT_UPLOADED'
  }

  const currentDate = +new Date()
  if (redirect_on && redirect_url) {
    return 'REDIRECT'
  }
  if (claim_finish && (currentDate > claim_finish)) {
    return 'FINISHED'
  }

  if (!active) {
    return 'PAUSED'
  }

  if (claim_start && (currentDate > claim_start)) {
    return 'ACTIVE'
  }

  if (!timeframe_on) {
    return 'ACTIVE'
  }

  return 'READY'
}

export default defineDispenserStatus