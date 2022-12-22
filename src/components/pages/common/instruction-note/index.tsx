import { FC } from 'react'
import { TProps } from './types'
import { Container, IconContainer, TextContainer } from './styled-components'

const InstructionNote: FC<TProps> = ({
  icon,
  children,
  className
}) => {

  return <Container className={className}>
    {icon && <IconContainer>
      {icon}
    </IconContainer>}
    <TextContainer>{children}</TextContainer>
  </Container>
}

export default InstructionNote