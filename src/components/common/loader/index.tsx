import React, { FC } from 'react'

import {
  LoaderContainer,
  LoaderSegment1,
  LoaderSegment2,
  LoaderSegment3,
  LoaderSegment4
} from './styled-components'

interface Props {
  size?: 'default' | 'large' | 'small',
  className?: string
}

const LoaderComponent: FC<Props> = ({ size = 'default', className = '' }) => {
  const loader = <LoaderContainer className={className}>
    <LoaderSegment1 />
    <LoaderSegment2 />
    <LoaderSegment3 />
    <LoaderSegment4 />
  </LoaderContainer>
  return loader
}

export default LoaderComponent
