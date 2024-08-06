import { FC, useState } from 'react'
import {
  Container,
  Header,
  WidgetTitleStyled,
  ContainerButton,
  DispensersListValueFixed,
  DispensersListStyled,
  BatchListLabelTextAlignRight,
  BatchListValueJustifySelfEnd
} from './styled-components'
import {
  Button,
  Tag
} from 'components/common'
import {
  NewDispenser
} from './components'
import {
  BatchListLabel,
  BatchListValue,
  WidgetComponent,
  InitialNote
} from 'components/pages/common'
import {
  formatDate,
  defineDispenserStatus, 
  defineDispenserStatusTag,
  defineQRStatusName,
  shortenString
} from 'helpers'
import { TQRStatus } from 'types'
import { RootState, IAppDispatch } from 'data/store'
import { connect } from 'react-redux'
import moment from 'moment'

const mapStateToProps = ({
  campaigns: { campaigns },
  dispensers: { dispensers, loading },
  user: { address, chainId },
  qrs: { qrs },
}: RootState) => ({
  campaigns,
  address,
  chainId,
  dispensers,
  loading,
  qrs
})

const defineQRType = (
  dynamic?: boolean,
) => {
  if (dynamic) {
    return 'Dynamic'
  }

  return 'Dispenser'
}

const defineHref = (
  dispenserId: string,
  dynamic?: boolean,
) => {
  if (dynamic) {
    return `/dispensers/${dispenserId}`
  }

  return `/dynamic-qrs/${dispenserId}`
}

const defineQrSetStatus = (
  status: TQRStatus
) => {
  const statusName = defineQRStatusName(status)
  return <Tag title={statusName} status='info' />
}


// @ts-ignore
type ReduxType = ReturnType<typeof mapStateToProps>

const Dispensers: FC<ReduxType> = ({
  qrs,
  dispensers,
  loading
}) => {

  const [
    showPopup,
    setShowPopup
  ] = useState<boolean>(false)

  if (dispensers.length === 0 && qrs.length === 0) {
    return <InitialNote
      title='Create Your First QR campaign'
      text="Start new QR campaign to distribute your tokens by choosing the method that best suits your needs:"
      onClick={() => setShowPopup(true)}
      buttontText='Proceed'
    />
  }

  return <Container>
    {showPopup && <NewDispenser onClose={() => {
      setShowPopup(false)
    }}/>}
    <WidgetComponent>
      <Header>
        <WidgetTitleStyled>Dispenser QR code</WidgetTitleStyled>
        <ContainerButton
          title='+ New'

          disabled={loading}
          size='extra-small'
          appearance='action'
          onClick={() => {
            setShowPopup(true)
          }}
        />
      </Header>
      {(dispensers.length > 0 || qrs.length > 0) && <DispensersListStyled>
        <BatchListLabel>Date created</BatchListLabel>
        <BatchListLabel>QR Type</BatchListLabel>
        <BatchListLabel>Title</BatchListLabel>
        <BatchListLabel>Start date</BatchListLabel>
        <BatchListLabel>Links</BatchListLabel>
        <BatchListLabel>Scans</BatchListLabel>
        <BatchListLabel>Claims</BatchListLabel>
        <BatchListLabel>Status</BatchListLabel>
        <BatchListLabelTextAlignRight>Actions</BatchListLabelTextAlignRight>
        
        {dispensers.map(dispenser => {
          const {
            title,
            links_count,
            dispenser_id,
            claim_duration,
            created_at,
            claim_start,
            claim_finish,
            active,
            redirect_on,
            redirect_url,
            timeframe_on,
            dynamic,
            links_assigned,
            links_claimed
          } = dispenser

          const currentStatus = defineDispenserStatus(
            claim_start as number,
            (claim_finish as number) || claim_start as number + (claim_duration || 1000000000000),
            links_count || 0,
            active,
            redirect_on,
            redirect_url,
            timeframe_on
          )
          const dateCreatedFormatted = formatDate(created_at || '')
          const claimStartWithNoOffset = moment(claim_start).utcOffset(0)
          const claimStartDate = claimStartWithNoOffset.format('MMMM D, YYYY')
          const redirectUrl = defineHref(
            dispenser_id as string,
            dynamic
          )
          return <>
            <BatchListValue>
              {dateCreatedFormatted}
            </BatchListValue>
            <BatchListValue>
              {defineQRType(dynamic)}
            </BatchListValue>
            <DispensersListValueFixed>
              {title}
            </DispensersListValueFixed>
            <BatchListValue>
              {claimStartDate}
            </BatchListValue>
            <BatchListValue>
              {links_count || '-'}
            </BatchListValue>
            <BatchListValue>
              {links_assigned || '-'}
            </BatchListValue>
            <BatchListValue>
              {links_claimed || '-'}
            </BatchListValue>
            <BatchListValue>{defineDispenserStatusTag(currentStatus)}</BatchListValue>
            <BatchListValueJustifySelfEnd>
              <Button
                appearance='additional'
                size='extra-small'
                title='Manage'
                to={redirectUrl}
              />
            </BatchListValueJustifySelfEnd>
          </>
        })}
        {qrs.map(qrSet => {
          return <>
            <BatchListValue>{qrSet.created_at && formatDate(qrSet.created_at)}</BatchListValue>
            <BatchListValue>QR set</BatchListValue>
            <DispensersListValueFixed>{qrSet.set_name}</DispensersListValueFixed>
            <BatchListValue>-</BatchListValue>
            <BatchListValue>
              {qrSet.qr_quantity || '-'}
            </BatchListValue>
            <BatchListValue>
              -
            </BatchListValue>
            <BatchListValue>
              -
            </BatchListValue>
            <BatchListValue>
              {defineQrSetStatus(qrSet.status)}
              {/* {
                (!qrSet.links_uploaded || !qrSet.campaign || !qrSet.campaign.campaign_id) ?
                  '-' : shortenString((qrSet.campaign || {}).title)
              } */}
            </BatchListValue>
            <BatchListValueJustifySelfEnd>
              <Button
                appearance='additional'
                size='extra-small'
                title='Manage'
                to={`/qrs/${qrSet.set_id}`}
              />
            </BatchListValueJustifySelfEnd>
          </>})
        }
      </DispensersListStyled>}
    </WidgetComponent>
  </Container>
}

export default connect(mapStateToProps)(Dispensers)
