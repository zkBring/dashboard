import { FC } from 'react'
import {
  Container,
  Card,
  CardText,
  CardTitle,
  ButtonStyled,
  Image
} from './styled-components'
import Icons from 'icons'

const cardTypes = [
  {
    title: 'Dynamic QR for electronic displays',
    text: 'A web page with an auto-refresh QR code that updates in real time. This ensures secure distribution, preventing a single user from claiming all tokens',
    link: '/dynamic-qrs',
    image: <Icons.DynamicQRPreviewIcon />
  }, {
    title: 'Printable Dispenser QR code',
    text: 'A single QR code that dispenses tokens one-by-one to users after they scan it. Ideal for controlled and sequential token distribution',
    link: '/dispensers',
    image: <Icons.DispenserQRPreviewIcon />
  }, {
    title: 'Printable Set of QR codes',
    text: 'A set of single-claim QR codes. Each QR code is valid for one claim only, and becomes invalid after being scanned and claimed by a user',
    link: '/qrs',
    image: <Icons.QRSetPreviewIcon />
  }
]

const QRManager: FC = () => {
  return <>
    <Container>
      {cardTypes.map(item => <Card>
        <Image>
          {item.image}
        </Image>
        <CardTitle>{item.title}</CardTitle>
        <CardText>{item.text}</CardText>
        <ButtonStyled to={item.link} appearance='action'>
          Manage
        </ButtonStyled>
      </Card>)}
    </Container>
  </>
}

export default QRManager