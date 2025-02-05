import { TProps } from './types'
import { FC } from 'react'
import {
  Aside
} from './styled-components'

const AsideComponent: FC<TProps> = ({
  className,
  children
}) => {

  return <Aside className={className}>
    {children}
  </Aside>
}


export default AsideComponent