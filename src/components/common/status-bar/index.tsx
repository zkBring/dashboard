import { FC } from 'react'
import {
  Value,
  Title,
  Container
} from './styled-components'

import { TProps } from './types'

const StatusBar: FC<TProps> = ({
  title,
  type,
  text,
  className
}) => {
  return <Container type={type} className={className}>
    <Title>{title}</Title>
    <Value>{text}</Value>
  </Container>
}

export default StatusBar