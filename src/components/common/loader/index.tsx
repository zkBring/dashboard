import { FC } from 'react'

import {
  Loader
} from './styled-components'

interface Props {
  size?: 'default' | 'large' | 'small',
  className?: string
}

const LoaderComponent: FC<Props> = ({ size = 'default', className = '' }) => {
  return <Loader className={className} size={size} />
}

export default LoaderComponent