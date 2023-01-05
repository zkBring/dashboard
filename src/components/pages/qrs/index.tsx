import { FC } from 'react'
import { Button } from 'components/common'
import {
  Container,
  ContainerButton,
  BatchListStyled,
  Header,
  WidgetTitleStyled,
  BatchListValueStyled,
  ErrorSpan,
  UploadedSpan
} from './styled-components'

import {
  BatchListLabel,
  BatchListValue,
  WidgetComponent
} from 'components/pages/common'
import Icons from 'icons'
import { defineQRStatusName, formatDate } from 'helpers'

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
  chainId,
  address,
  addQRSet,
  qrs,
  loading
}) => {
  return <Container>
    <WidgetComponent>
      <Header>
        <WidgetTitleStyled>My QR sets</WidgetTitleStyled>
        <ContainerButton
          title='+ Add new set'
          size='small'
          appearance='additional'
          to='/qrs/new'
        />
      </Header>
    
      {qrs.length > 0 && <BatchListStyled>
        <BatchListLabel>Name of set</BatchListLabel>
        <BatchListLabel>Quantity</BatchListLabel>
        <BatchListLabel>Date created</BatchListLabel>
        <BatchListLabel>Claim links</BatchListLabel>
        <BatchListLabel>Status</BatchListLabel>
        <BatchListLabel></BatchListLabel>
        {qrs.map(qr => {
          return <>
            <BatchListValue>{qr.set_name}</BatchListValue>
            <BatchListValue>{qr.qr_quantity}</BatchListValue>
            <BatchListValue>{qr.created_at && formatDate(qr.created_at)}</BatchListValue>
            <BatchListValue>{qr.links_uploaded ? <UploadedSpan>Uploaded</UploadedSpan> : <ErrorSpan>
              <Icons.NotUploadedIcon />
              Not uploaded
            </ErrorSpan>}</BatchListValue>
            <BatchListValue>{defineQRStatusName(qr.status)}</BatchListValue>
            <BatchListValueStyled>
              <Button
                appearance='additional'
                size='small'
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
