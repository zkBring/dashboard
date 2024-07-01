import { FC } from 'react'
import { TDispenserStatus, TStatus } from 'types'
import { StatusBar } from 'components/common'
import { TProps } from './types'
import { StatusBarStyled } from './styled-components'

const defineStatus: (status: TDispenserStatus) => TStatus = (status: TDispenserStatus) => {
  switch (status) {
    case 'ACTIVE':
      return 'default'
    case 'FINISHED':
      return 'error'
    case 'PAUSED':
      return 'info'
    case 'NOT_UPLOADED':
      return 'error'
    case 'REDIRECT':
      return 'info'
    case 'READY':
      return 'info'
    default:
      return 'info'
  }
}

const defineTitle: (status: TDispenserStatus) => string = (status: TDispenserStatus) => {
  switch (status) {
    case 'NOT_UPLOADED':
      return 'Next step'
    default:
      return 'Status'
  }
}

const defineText: (status: TDispenserStatus) => string = (status: TDispenserStatus) => {
  switch (status) {
    case 'ACTIVE':
      return 'Active'
    case 'FINISHED':
      return 'Finished'
    case 'PAUSED':
      return 'Paused'
    case 'NOT_UPLOADED':
      return 'Upload Links'
    case 'REDIRECT':
      return 'Redirect enabled'
    case 'READY':
      return 'Ready'
    default:
      return ''
  }
}

const Status: FC<TProps> = ({
  status
}) => {
  const statusType = defineStatus(status)
  const title = defineTitle(status)
  const text = defineText(status)

  return <StatusBarStyled
    type={statusType}
    title={title}
    text={text}
  />
}

export default Status
