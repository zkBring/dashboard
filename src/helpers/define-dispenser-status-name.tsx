import { TDispenserStatus } from 'types'

const defineDispenserStatusName = (status: TDispenserStatus) => {
  switch (status) {
    case 'ACTIVE' :
      return 'Active'
    case 'FINISHED':
      return 'Finished'
    case 'READY':
      return 'Ready'
    case 'STOPPED':
      return 'Stopped'
    default:
      return 'Not uploaded'
  }
}

export default defineDispenserStatusName