import { TDispenserStatus } from 'types'

const defineDispenserStatusName = (status: TDispenserStatus) => {
  switch (status) {
    case 'ACTIVE' :
      return 'Active'
    case 'ARCHIVED' :
      return 'Archived'
    case 'FINISHED':
      return 'Finished'
    case 'READY':
      return 'Ready'
    case 'PAUSED':
      return 'Paused'
    case 'REDIRECT':
      return 'Redirecting'
    default:
      return 'Not uploaded'
  }
}

export default defineDispenserStatusName