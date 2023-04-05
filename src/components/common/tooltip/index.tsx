import { FC } from 'react'
import TProps from './types'
import { TooltipContainer } from './styled-components'

const Tooltip: FC<TProps> = ({ text, children }) => {
  return <TooltipContainer text={text}>{children}</TooltipContainer>
}

export default Tooltip