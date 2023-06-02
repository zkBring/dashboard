import { FC, useEffect, useState } from 'react'
import { RootState, IAppDispatch } from 'data/store'
import {
  Container,
  WidgetSubtitle,
  TableRow,
  TableText,
  TableValue,
  DownloadQRPopup,
  UploadLinksPopup,
  ErrorSpan,
  UploadedSpan,
} from 'components/pages/common'
import {
  Buttons,
  WidgetButton,
  WidgetComponentStyled,
  CopyContainerStyled,
  AsideContent,
  AsideSubtitle,
  Counter,
  SecondaryTextSpan,
  AsideStyled
} from './styled-components'
import { TextLink } from 'components/common'
import { formatDate, formatTime, defineDispenserStatus, defineDispenserStatusName, defineIfQRIsDeeplink } from 'helpers'
import { Redirect, useHistory, useParams } from 'react-router-dom'
import { TDispenser, TDispenserStatus, TLinkDecrypted } from 'types'
import { connect } from 'react-redux'
import * as asyncDispensersActions from 'data/store/reducers/dispensers/async-actions'
import { decrypt } from 'lib/crypto'
import Icons from 'icons'
import moment from 'moment'
const {
  REACT_APP_CLAIM_APP
} = process.env

const mapStateToProps = ({
  campaigns: { campaigns },
  dispensers: { dispensers, loading, mappingLoader },
  user: { address, chainId, dashboardKey },
}: RootState) => ({
  campaigns,
  address,
  chainId,
  dispensers,
  loading,
  dashboardKey,
  mappingLoader
})

const defineOptions = (redirectCallback: () => void, status?: TDispenserStatus) => {
  return [
    {
      title: 'Edit',
      icon: <Icons.EditDispenserIcon />,
      disabled: status === 'ACTIVE' || status === 'FINISHED',
      action: redirectCallback
    },
  ]
}

const mapDispatcherToProps = (dispatch: IAppDispatch) => {
  return {
    addLinksToQR: (
      dispenserId: string,
      links: TLinkDecrypted[],
      encryptedMultiscanQREncCode: string,
      linksCount: number,
      callback?: () => void,
    ) => dispatch(asyncDispensersActions.addLinksToQR({
      dispenserId,
      links,
      encryptedMultiscanQREncCode,
      linksCount,
      callback
    })),
    downloadQR: (
      size: number,
      multiscan_qr_id: string,
      encrypted_multiscan_qr_secret: string,
      encrypted_multiscan_qr_enc_code: string,
      qrDispenserName: string,
      callback?: () => void
    ) => dispatch(asyncDispensersActions.downloadDispenserQR({
      multiscan_qr_id,
      encrypted_multiscan_qr_secret,
      encrypted_multiscan_qr_enc_code,
      qrDispenserName,
      width: size,
      height: size,
      callback
    })),
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

const defineStatusAppearance = (status: TDispenserStatus) => {
  const statusName = defineDispenserStatusName(status)
  if (status === 'NOT_UPLOADED') {
    return <ErrorSpan>
      <Icons.NotUploadedIcon />
      {statusName}
    </ErrorSpan>
  }

  return <UploadedSpan>{statusName}</UploadedSpan>
}

const Dispenser: FC<ReduxType> = ({
  dispensers,
  loading,
  mappingLoader,
  addLinksToQR,
  dashboardKey,
  address,
  downloadQR
}) => {
  const { id } = useParams<{id: string}>()
  const dispenser: TDispenser | undefined = dispensers.find(dispenser => String(dispenser.dispenser_id) === id)
  const history = useHistory()

  const [
    updateLinksPopup,
    toggleUpdateLinksPopup
  ] = useState<boolean>(false)

  const [
    downloadPopup,
    toggleDownloadPopup
  ] = useState<boolean>(false)


  if (!dispenser || !dashboardKey) {
    return <Redirect to='/dispensers' />
  }

  const { title, multiscan_qr_id, dispenser_id, claim_duration, claim_start, links_count, encrypted_multiscan_qr_enc_code, encrypted_multiscan_qr_secret } = dispenser 
  const currentStatus = defineDispenserStatus(claim_start, claim_duration, links_count || 0)
  const dispenserOptions = defineOptions(() => history.push(`/dispensers/edit/${dispenser.dispenser_id}`), currentStatus)
  const claimStartWithNoOffset = moment(claim_start).utcOffset(0)
  const claimStartDate = claimStartWithNoOffset.format('MMMM D, YYYY')
  const claimStartTime = claimStartWithNoOffset.format('HH:mm:ss')
  const isDeeplink = defineIfQRIsDeeplink(address)
  const originalLink = `${REACT_APP_CLAIM_APP}/#/mqr/${decrypt(encrypted_multiscan_qr_secret, dashboardKey)}/${decrypt(encrypted_multiscan_qr_enc_code, dashboardKey)}`
  const claimUrl = isDeeplink ? isDeeplink.replace('%URL%', encodeURIComponent(originalLink)) : originalLink

  return <Container>
    {updateLinksPopup && <UploadLinksPopup
      loader={mappingLoader}
      loading={loading}
      onClose={() => toggleUpdateLinksPopup(false)}
      onSubmit={links => {
        
        if (!dispenser_id) { return alert('Dispenser ID not found') }
        if (!encrypted_multiscan_qr_enc_code) { return alert('encrypted_multiscan_qr_enc_code not found') }
        if (!links_count) { return alert('links_count not found') }
        if (!links) { return alert('Links not found') }

        addLinksToQR(dispenser_id, links, encrypted_multiscan_qr_enc_code, links_count, () => {
          toggleUpdateLinksPopup(false)
        })
      }}
    />}
    {id && downloadPopup && <DownloadQRPopup
      onSubmit={(size: number) => {
        downloadQR(
          size,
          multiscan_qr_id,
          encrypted_multiscan_qr_secret,
          encrypted_multiscan_qr_enc_code,
          title,
          () => { toggleDownloadPopup(false) }
        )
      }}
      onClose={() => toggleDownloadPopup(false)}
    />}
    <WidgetComponentStyled title={dispenser?.title || 'Untitled dispenser'}>
      <WidgetSubtitle>Dispenser app is represented by a single link or QR code that you can share for multiple users to scan to claim a unique token. Scanning is limited within a certain timeframe</WidgetSubtitle>
      <CopyContainerStyled
        text={claimUrl}
        title='Scan the code to see claim page'
      />
      
      <Buttons>
        <WidgetButton
          title='Back'
          appearance='default'
          to='/dispensers'
        /> 
        <WidgetButton
          title='Download PNG'
          appearance='action'
          onClick={() => {
            toggleDownloadPopup(true)
          }}
        /> 
      </Buttons>
    </WidgetComponentStyled>
    <AsideStyled
      title="Connect to claim links"
      options={dispenserOptions}
    >
      <WidgetSubtitle>
          Upload a CSV file with links. Number of rows in the file should be equal to the number of QR codes. 
      </WidgetSubtitle>
      <WidgetSubtitle>
        If you haven’t created claim links yet, then do it in <TextLink to='/campaigns'>Claim links</TextLink>
      </WidgetSubtitle>
      <AsideContent>
        <AsideSubtitle>Amount of links</AsideSubtitle>
        <Counter>{links_count || 0}</Counter>
        <TableRow>
          <TableText>Status</TableText>
          <TableValue>{defineStatusAppearance(currentStatus)}</TableValue>
        </TableRow>
        <TableRow>
          <TableText>Start date</TableText>
          <TableValue>{claimStartDate}, <SecondaryTextSpan>{claimStartTime} (UTC+0)</SecondaryTextSpan></TableValue>
        </TableRow>
        <TableRow>
          <TableText>Duration</TableText>
          <TableValue>{claim_duration} mins</TableValue>
        </TableRow>
      </AsideContent>

      <WidgetButton
        title='Upload file'
        disabled={currentStatus === 'FINISHED' || currentStatus === 'ACTIVE'}
        appearance='action'
        onClick={() => {
          toggleUpdateLinksPopup(true)
        }}
        /> 
    </AsideStyled>
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(Dispenser)