import { FC, useEffect, useState } from 'react'
import { useParams, Redirect } from 'react-router-dom'
import { TLinkParams, TSelectOption } from 'types'
import { RootState, IAppDispatch } from 'data/store'
import { connect } from 'react-redux'
import { defineQRStatusName } from 'helpers'
import qrStatus from 'configs/qr-status'
import { Popup } from 'components/common'

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
  qrs: { qrs },
  user: { address, chainId },
}: RootState) => ({
  campaigns,
  address,
  chainId,
  qrs
})

type ReduxType = ReturnType<typeof mapStateToProps>

const QR: FC<ReduxType> = ({
  qrs
}) => {
  const { id } = useParams<TLinkParams>()
  const qr = qrs.find(qr => String(qr.id) === id)
  const [ status, setStatus ] = useState<TSelectOption | null>(null)
  const [
    updateQuantityPopup,
    toggleUpdateQuantityPopup
  ] = useState<boolean>(false)
  const selectoOptions: TSelectOption[] = qrStatus.map(status => ({
    label: defineQRStatusName(status),
    value: status
  })) 

  useEffect(() => {
    if (qr) {
      const option = selectoOptions.find(item => item.value === qr.status)
      if (!option) { return }
      setStatus(option)
    }
  }, [qr])
  if (!qr) {
    return <Redirect to='/qrs' /> 
  }
  
  
  
  return <Container>
    {updateQuantityPopup && <Popup
      title='Change quantity of QRs needed'
      onClose={() => {
        toggleUpdateQuantityPopup(false)
      }}
    >

    </Popup>}
    <WidgetComponent title={qr.title}>
      <WidgetInfo>
        <WidgetSubtitle>
          Quantity: {qr.amount} QRs
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
            options={selectoOptions}
            value={status ? status : undefined}
            onChange={option => setStatus(option)}
            placeholder='Choose wallet'
          />
        </WidgetValue>
      </WidgetInfo>

      <WidgetInfo>
        <WidgetSubtitle>
          Claimable links: No links
        </WidgetSubtitle>
        <WidgetValue>
          <WidgetButton title='Upload links'/>
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

export default connect(mapStateToProps)(QR)