import { FC } from 'react'
import {
  TagContainer
} from './styled-components'
import { TProps } from './types'

const Tag: FC<TProps> = ({
  title,
  status
}) => <TagContainer status={status}>{title}</TagContainer>

export default Tag