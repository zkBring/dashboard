import { FC } from 'react'
import { TProps } from './types'
import {
  Container,
  Image,
  Title,
  Text,
  ButtonStyled
} from './styled-components'
import DropImage from 'images/drop.png'

const InitialNote: FC<TProps> = ({
  title,
  text,
  href,
  buttontText,
  onClick
}) => {
  return <Container>
    <Image src={DropImage} />
    <Title>
      {title}
    </Title>
    <Text>
      {text}
    </Text>
    {href ? <ButtonStyled
      to={href}
      appearance='action'
    >
      {buttontText}
    </ButtonStyled> : <ButtonStyled
      onClick={onClick}
      appearance='action'
    >
      {buttontText}
    </ButtonStyled>}
  </Container>
}

export default InitialNote
