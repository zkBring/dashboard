import { FC, useEffect, useState } from 'react'
import { useParams, Redirect } from 'react-router-dom'
import { TLinkParams, TQRStatus, TSelectOption } from 'types'
import { RootState, IAppDispatch } from 'data/store'
import { connect } from 'react-redux'
import { defineQRStatusName } from 'helpers'
import qrStatus from 'configs/qr-status'
import { QuantityPopup, LinksPopup } from './components'
import { Loader } from 'components/common'

import {
  Container,
  WidgetComponent,
  WidgetInfo,
  WidgetSubtitle,
  WidgetValue,
  Buttons,
  WidgetButton
} from './styled-components'
import { Select } from 'components/common'
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
    updateQRStatus: (
      setId: string | number,
      newStatus: TQRStatus,
      callback: () => void
    ) => dispatch(asyncQRsActions.updateQRStatus({ setId, newStatus, callback }))
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

const QR: FC<ReduxType> = ({
  qrs,
  updateQRStatus,
  loading
}) => {
  const { id } = useParams<TLinkParams>()
  const qr = qrs.find(qr => String(qr._id) === id)
  const [ status, setStatus ] = useState<TSelectOption | null>(null)

  const [
    updateQuantityPopup,
    toggleUpdateQuantityPopup
  ] = useState<boolean>(false)
  const [
    updateLinksPopup,
    toggleUpdateLinksPopup
  ] = useState<boolean>(false)

  const selectOptions: TSelectOption<TQRStatus>[] = qrStatus.map(status => ({
    label: defineQRStatusName(status),
    value: status
  })) 

  useEffect(() => {
    if (qr) {
      const option = selectOptions.find(item => item.value === qr.status)
      if (!option) { return }
      setStatus(option)
    }
  }, [qr])

  if (!qr) {
    return <Redirect to='/qrs' /> 
  }

  return <Container>
    {loading && <Loader withOverlay />}
    {updateQuantityPopup && <QuantityPopup
      onClose={() => toggleUpdateQuantityPopup(false)}
      quantity={qr.qrQuantity}
      onSubmit={value => console.log({ value })}
    />}

    {updateLinksPopup && <LinksPopup
      quantity={qr.qrQuantity}
      onClose={() => toggleUpdateLinksPopup(false)}
      onSubmit={links => {
        // here is request to map links
      }}
    />}

    <WidgetComponent title={qr.setName}>
      <WidgetInfo>
        <WidgetSubtitle>
          Quantity: {qr.qrQuantity} QRs
        </WidgetSubtitle>
        <WidgetValue>
          <Buttons>
            <WidgetButton
              title='Change quantity'
              onClick={() => {
                toggleUpdateQuantityPopup(true)
              }}
            />
            <WidgetButton title='Download' appearance='action' /> 
          </Buttons>
        </WidgetValue>
        <WidgetSubtitle>
          Status
        </WidgetSubtitle>
        <WidgetValue>
          <Select
            options={selectOptions}
            value={status ? status : undefined}
            onChange={option => {
              if (!id) { return }
              updateQRStatus(
                id,
                option.value as TQRStatus,
                () => { setStatus(option) }
              )
            }}
            placeholder='Choose wallet'
          />
        </WidgetValue>
      </WidgetInfo>

      <WidgetInfo>
        <WidgetSubtitle>
          Claimable links: No links
        </WidgetSubtitle>
        <WidgetValue>
          <WidgetButton
            title='Upload links'
            onClick={() => {
              toggleUpdateLinksPopup(true)
            }}
          />
        </WidgetValue>
        <WidgetSubtitle />
        <WidgetValue>
          Upload a CSV file with links, file should include number of rows 
          equivalent to a number of QR codes
        </WidgetValue>
      </WidgetInfo>
    </WidgetComponent>
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(QR)