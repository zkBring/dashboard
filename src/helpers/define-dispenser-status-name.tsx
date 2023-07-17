import { TDispenserStatus } from 'types'

const defineDispenserStatusName = (status: TDispenserStatus) => {
  switch (status) {
    case 'ACTIVE' :
      return 'Active'
    case 'FINISHED':
      return 'Finished'
    case 'READY':
      return 'Ready'
    case 'PAUSED':
      return 'Paused'
    default:
      return 'Not uploaded'
  }
}

export default defineDispenserStatusName