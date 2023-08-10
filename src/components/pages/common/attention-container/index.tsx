import { FC } from 'react'
import {
  Container,
  Title,
  Text,
  ButtonsContainer,
  ButtonStyled
} from './styled-components'
import { TProps } from './types'

const AttentionContainer: FC<TProps> = ({
  title,
  text,
  actions
}) => {
  return <Container>
    <Title>{title}</Title>
    <Text>{text}</Text>
    <ButtonsContainer>
      {actions.map(action => {
        return <ButtonStyled
          onClick={action.onClick}
        >
          {action.title}
        </ButtonStyled>
      })}
    </ButtonsContainer>
  </Container>
}

export default AttentionContainer
