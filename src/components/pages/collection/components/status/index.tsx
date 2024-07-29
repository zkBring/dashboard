import { FC } from 'react'
import { TCollectionStatus, TStatus } from 'types'
import { TProps } from './types'
import { StatusBarStyled } from './styled-components'

const defineStatus: (
  status: TCollectionStatus
) => TStatus = (status: TCollectionStatus) => {
  switch (status) {
    case 'ACTIVE':
      return 'success'
    case 'ADD_TOKENS':
      return 'default'
    case 'CREATE_LINKS':
      return 'info'
    case 'LOADING':
      return 'info'
    default:
      return 'info'
  }
}

const defineTitle: (status: TCollectionStatus) => string = (
  status
) => {
  switch (status) {
    case 'ADD_TOKENS':
    case 'CREATE_LINKS':
      return 'Next step'
    default:
      return 'Status'
  }
}

const defineText: (
  status: TCollectionStatus
) => string = (
  status
  ) => {
  switch (status) {
    case 'ADD_TOKENS':
      return 'Add tokens'
    case 'CREATE_LINKS':
      return 'Create links'
    case 'ACTIVE':
      return 'Active'
    case 'LOADING':
      return 'Loading'
    default:
      return status
  }
}

const Status: FC<TProps> = ({
  status
}) => {
  const statusType = defineStatus(status)
  const title = defineTitle(status)
  const text = defineText(
    status
  )

  return <StatusBarStyled
    type={statusType}
    title={title}
    text={text}
  />
}

export default Status
