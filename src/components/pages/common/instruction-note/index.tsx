import { FC } from 'react'
import { TProps } from './types'
import { Container, IconContainer, TextContainer } from './styled-components'

const InstructionNote: FC<TProps> = ({
  icon,
  children,
  className,
  onClick
}) => {
  return <Container className={className} onClick={onClick}>
    {icon && <IconContainer>
      {icon}
    </IconContainer>}
    <TextContainer>{children}</TextContainer>
  </Container>
}

export default InstructionNote