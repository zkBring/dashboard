import React, { FC } from 'react'
import { TitleComponent } from './styled-components'
import { TProps } from './types'

const Title: FC<TProps> = ({ children }) => {
  return <TitleComponent>{children}</TitleComponent>
}

export default Title