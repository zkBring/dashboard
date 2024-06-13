import { FC } from 'react'
import { Wrapper, WrapperTitle, WrapperContent } from './styled-components'
import { TProps } from './types'

const InfoBlock: FC<TProps> = ({ title, children, className }) => {
  return <Wrapper className={className}>
    <WrapperTitle>{title}</WrapperTitle>
    <WrapperContent>{children}</WrapperContent>
  </Wrapper>
}


export default InfoBlock