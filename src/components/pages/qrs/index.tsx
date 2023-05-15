import { FC } from 'react'
import { Button, TextLink } from 'components/common'
import {
  Container,
  ContainerButton,
  BatchListStyled,
  Header,
  WidgetTitleStyled,
  BatchListValueStyled,
  BatchListLabelStyled
} from './styled-components'
import {
  BatchListLabel,
  BatchListValue,
  WidgetComponent,
  InitialGuide,
  ErrorSpan,
  UploadedSpan,
} from 'components/pages/common'
import Icons from 'icons'
import { defineQRStatusName, formatDate, shortenString } from 'helpers'

import { RootState, IAppDispatch } from 'data/store'
import { connect } from 'react-redux'
import * as asyncQRsActions from 'data/store/reducers/qrs/async-actions.tsx'

const mapStateToProps = ({
  campaigns: { campaigns },
  qrs: { qrs, loading },
  user: { address, chainId },
}: RootState) => ({
  campaigns,
  address,
  chainId,
  qrs,
  loading
})

const mapDispatcherToProps = (dispatch: IAppDispatch) => {
  return {
    addQRSet: (
      title: string,
      quantity: number,
      callback: (id: string | number) => void
    ) => dispatch(asyncQRsActions.addQRSet({ title, quantity, callback }))
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

const QRs: FC<ReduxType> = ({
  qrs,
}) => {
  return <Container>
    <InitialGuide />
    <WidgetComponent>
      <Header>
        <WidgetTitleStyled>My QR codes</WidgetTitleStyled>
        <ContainerButton
          title='+ Create QR codes'
          size='extra-small'
          appearance='action'
          to='/qrs/new'
        />
      </Header>
    
      {qrs.length > 0 && <BatchListStyled>
        <BatchListLabel>Name of set</BatchListLabel>
        <BatchListLabel>Quantity</BatchListLabel>
        <BatchListLabel>Date created</BatchListLabel>
        <BatchListLabel>Claim links</BatchListLabel>
        <BatchListLabel>Linked campaign</BatchListLabel>
        <BatchListLabel>Status</BatchListLabel>
        <BatchListLabel></BatchListLabel>
        {qrs.map(qr => {
          return <>
            <BatchListLabelStyled>{qr.set_name}</BatchListLabelStyled>
            <BatchListValue>{qr.qr_quantity}</BatchListValue>
            <BatchListValue>{qr.created_at && formatDate(qr.created_at)}</BatchListValue>
            <BatchListValue>{qr.links_uploaded ? <UploadedSpan>Uploaded</UploadedSpan> : <ErrorSpan>
              <Icons.NotUploadedIcon />
              Not uploaded
            </ErrorSpan>}</BatchListValue>
            <BatchListValue>
              {
                (!qr.links_uploaded || !qr.campaign || !qr.campaign.campaign_id) ?
                  '-' : shortenString((qr.campaign || {}).title)
              }
            </BatchListValue>
            <BatchListValue>{defineQRStatusName(qr.status)}</BatchListValue>
            <BatchListValueStyled>
              <Button
                appearance='additional'
                size='extra-small'
                title='Manage'
                to={`/qrs/${qr.set_id}`}
              />
            </BatchListValueStyled>
          </>
        })}
      </BatchListStyled>}
    </WidgetComponent>
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(QRs)
