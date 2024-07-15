import { FC } from 'react'
import {
  Container,
  Card,
  CardText,
  CardTitle,
  ButtonStyled,
  Image
} from './styled-components'

import DynamicQRPreview from 'images/dynamic-qr-preview.png'
import DispenserQRPreview from 'images/dispenser-qr-preview.png'
import QRSetPreview from 'images/qr-set-preview.png'
import { InitialGuide } from 'components/pages/common'

const cardTypes = [
  {
    title: 'Dynamic QR',
    text: 'A web page with an auto-refresh QR code that updates in real time. This ensures secure distribution, preventing a single user from claiming all tokens',
    link: '/dynamic-qrs',
    image: DynamicQRPreview
  }, {
    title: 'Dispenser QR',
    text: 'A single QR code that dispenses tokens one-by-one to users after they scan it. Ideal for controlled and sequential token distribution',
    link: '/dispensers',
    image: DispenserQRPreview
  }, {
    title: 'QR Set',
    text: 'A set of single-claim QR codes. Each QR code is valid for one claim only, and becomes invalid after being scanned and claimed by a user',
    link: '/qrs',
    image: QRSetPreview
  }
]

const QRManager: FC = () => {
  return <>
    <Container>
      {cardTypes.map(item => <Card>
        <Image src={item.image}/>
        <CardTitle>{item.title}</CardTitle>
        <CardText>{item.text}</CardText>
        <ButtonStyled to={item.link} appearance='action'>
          Create
        </ButtonStyled>
      </Card>)}
    </Container>
  </>
}

export default QRManager