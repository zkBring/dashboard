import { FC } from 'react'
import { TProps } from './types'
import {
  Container,
  Image,
  Title,
  Text,
  ButtonStyled
} from './styled-components'

import Icons from 'icons'

const InitialNote: FC<TProps> = ({
  title,
  text,
  href,
  buttontText,
  onClick
}) => {
  return <Container>
    <Image>
      <Icons.SunnyCloudIcon />
    </Image>
    <Title>
      {title}
    </Title>
    <Text>
      {text}
    </Text>
    <ButtonStyled
      to={href}
      onClick={onClick}
      appearance='action'
    >
      {buttontText}
    </ButtonStyled>
  </Container>
}

export default InitialNote
