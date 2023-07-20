import { FC, useState } from 'react'
import { RootState, IAppDispatch } from 'data/store'
import {
  Container,
  WidgetSubtitle,
  TableRow,
  TableText,
  TableValue,
  DownloadQRPopup,
  UploadLinksPopup,
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
  AsideStyled,
  AsideWidgetButton,
  MainContent
} from './styled-components'
import { Statistics, RedirectWidget } from './components'
import { TextLink } from 'components/common'
import {
  defineDispenserStatus,
  defineIfQRIsDeeplink,
  defineDispenserStatusTag
} from 'helpers'
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

const defineOptions = (
  status: TDispenserStatus,
  editCallback: () => void,
  pauseCallback: () => void,
  unpauseCallback: () => void
) => {
  return [
    {
      title: 'Edit',
      icon: <Icons.EditDispenserIcon />,
      disabled: status === 'ACTIVE' || status === 'FINISHED',
      action: editCallback
    }, {
      title: status === 'PAUSED' ? 'Unpause' : 'Pause',
      icon: status === 'PAUSED' ? <Icons.UnpauseIcon /> : <Icons.PauseIcon />,
      action: status === 'PAUSED' ? unpauseCallback : pauseCallback
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
      currentStatus: TDispenserStatus,
      callback?: () => void,
    ) => dispatch(asyncDispensersActions.addLinksToQR({
      dispenserId,
      links,
      encryptedMultiscanQREncCode,
      linksCount,
      currentStatus,
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
    pauseDispenser: (
      dispenser_id: string,
      callback?: () => void
    ) => dispatch(asyncDispensersActions.updateStatus({
      dispenser_id,
      active: false,
      callback
    })),
    unpauseDispenser: (
      dispenser_id: string,
      callback?: () => void
    ) => dispatch(asyncDispensersActions.updateStatus({
      dispenser_id,
      active: true,
      callback
    })),
    toggleRedirectURL: (
      dispenser_id: string,
      redirect_on: boolean,
      successCallback: () => void,
      errorCallback: () => void
    ) => dispatch(asyncDispensersActions.toggleRedirectOn({
      dispenser_id,
      redirect_on,
      successCallback,
      errorCallback
    })),
    updateRedirectURL: (
      dispenser_id: string,
      redirect_url: string,
      successCallback: () => void,
      errorCallback: () => void
    ) => dispatch(asyncDispensersActions.updateRedirectURL({
      dispenser_id,
      redirect_url,
      successCallback,
      errorCallback
    })),
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

const Dispenser: FC<ReduxType> = ({
  dispensers,
  loading,
  mappingLoader,
  addLinksToQR,
  dashboardKey,
  address,
  downloadQR,
  pauseDispenser,
  unpauseDispenser,
  updateRedirectURL,
  toggleRedirectURL
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

  const { title, multiscan_qr_id, dispenser_id, active, claim_duration, claim_start, links_count, encrypted_multiscan_qr_enc_code, encrypted_multiscan_qr_secret } = dispenser 
  const currentStatus = defineDispenserStatus(claim_start, claim_duration, links_count || 0, active)
  const dispenserOptions = defineOptions(
    currentStatus,
    () => history.push(`/dispensers/edit/${dispenser.dispenser_id}`),
    () => pauseDispenser(id, () => {}),
    () => unpauseDispenser(id, () => {})
  )
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
        if (links_count === undefined) { return alert('links_count not found') }
        if (!links) { return alert('Links not found') }
        addLinksToQR(dispenser_id, links, encrypted_multiscan_qr_enc_code, links_count, currentStatus, () => {
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

    <MainContent>
      <WidgetComponentStyled title={dispenser?.title || 'Untitled dispenser'}>
        <WidgetSubtitle>Dispenser app is represented by a single link or QR code that you can share for multiple users to scan to claim a unique token. Scanning is limited within a certain timeframe</WidgetSubtitle>
        <CopyContainerStyled
          text={claimUrl}
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

      <RedirectWidget
        hasRedirect={dispenser.redirect_on}
        redirectUrl={dispenser.redirect_url}
        claimUrl={claimUrl}
        updateNewRedirectUrl={(
          newRedirectUrl,
          successCallback,
          errorCallback
        ) => {
          updateRedirectURL(
            dispenser.dispenser_id as string,
            newRedirectUrl,
            successCallback,
            errorCallback
          )
        }}
        toggleRedirectOn={(
          redirectOn,
          successCallback,
          errorCallback
        ) => {
          toggleRedirectURL(
            dispenser.dispenser_id as string,
            redirectOn,
            successCallback,
            errorCallback
          )
        }}
      />
    </MainContent>
    
    <div>
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
            <TableValue>{defineDispenserStatusTag(currentStatus)}</TableValue>
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

        <AsideWidgetButton
          title='Upload file'
          disabled={currentStatus === 'FINISHED'}
          appearance='action'
          onClick={() => {
            toggleUpdateLinksPopup(true)
          }}
        /> 
      </AsideStyled>
      <Statistics
        linksCount={links_count || 0}
        dispenserStatus={currentStatus}
      />
    </div>
    
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(Dispenser)