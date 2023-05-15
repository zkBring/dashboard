import { TDispenserStatus } from 'types'

const defineDispenserStatusName = (status: TDispenserStatus) => {
  switch (status) {
    case 'ACTIVE' :
      return 'Active'
    case 'FINISHED':
      return 'Finished'
    case 'READY':
      return 'Ready'
    default:
      return 'Not uploaded'
  }
}

export default defineDispenserStatusName