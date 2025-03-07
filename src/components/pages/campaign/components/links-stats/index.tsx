import { FC } from 'react'
import TProps from './types'
import {
  Container,
  Subtitle,
  Value,
  WidgetComponent
} from './styled-components'
import Icons from 'icons'

const LinksStats: FC<TProps> = ({
  linksAmount,
  linksClaimed,
  sponsored
}) => {
  return <Container>
    <WidgetComponent>
      <Subtitle>Links created</Subtitle>
      <Value>
        <Icons.ProfileIcon />
        {linksAmount || 0}
      </Value>
    </WidgetComponent>
     <WidgetComponent>
      <Subtitle>Tokens claimed</Subtitle>
      <Value>
        <Icons.CoinIcon />
        {sponsored ? (linksClaimed|| 0) : 'N/A'}
      </Value>
    </WidgetComponent>
  </Container>
}
export default LinksStats