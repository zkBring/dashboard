import { FC, useState, useMemo, useEffect } from 'react'
import { RootState, IAppDispatch } from 'data/store'
import {
  Container,
  WidgetSubtitle,
  TableRow,
  TableText,
  TableValue,
  DownloadQRPopup,
  UploadLinksPopup,
  AttentionContainer
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
  defineDispenserStatusTag,
  alertError
} from 'helpers'
import { Redirect, useHistory, useParams } from 'react-router-dom'
import { TDispenser, TDispenserStatus, TLinkDecrypted } from 'types'
import { connect } from 'react-redux'
import * as asyncDispensersActions from 'data/store/reducers/dispensers/async-actions'
import { decrypt, encrypt } from 'lib/crypto'
import Icons from 'icons'
import moment from 'moment'
import { ethers } from 'ethers'
import { defineClaimAppURL, defineNetworkName } from 'helpers'
import { plausibleApi } from 'data/api'

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
    getDispenserStats: (
      dispenser_id: string,
      callback?: () => void
    ) => dispatch(asyncDispensersActions.getDispenserStats({
      dispenser_id,
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
      encrypted_multiscan_qr_enc_code: string,
      successCallback: () => void,
      errorCallback: () => void
    ) => dispatch(asyncDispensersActions.updateRedirectURL({
      dispenser_id,
      redirect_url,
      encrypted_multiscan_qr_enc_code,
      successCallback,
      errorCallback
    })),
    downloadReport: (
      dispenser_id: string,
    ) => dispatch(asyncDispensersActions.downloadReport(
      dispenser_id
    ))
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
  toggleRedirectURL,
  getDispenserStats,
  downloadReport,
  chainId
}) => {
  const { id } = useParams<{id: string}>()
  const dispenser: TDispenser | undefined = dispensers.find(dispenser => String(dispenser.dispenser_id) === id)
  const history = useHistory()
  const [
    updateLinksPopup,
    toggleUpdateLinksPopup
  ] = useState<boolean>(false)

  const [
    statsLoading,
    setStatsLoading
  ] = useState<boolean>(true)

  const [
    downloadPopup,
    toggleDownloadPopup
  ] = useState<boolean>(false)


  useEffect(() => {
    if (!dispenser) { return }
    getDispenserStats(
      dispenser.dispenser_id as string,
      () => setStatsLoading(false)
    )
  }, [])

  const isDeeplink = defineIfQRIsDeeplink(address)
  const claimAppURL = defineClaimAppURL(address)

  const {
    claimURLDecrypted,
    redirectURLDecrypted
  } = useMemo<{claimURLDecrypted: string, redirectURLDecrypted: string}>(() => {
    if (!dispenser || !dashboardKey) { return { claimURLDecrypted: '', redirectURLDecrypted: '' } }
      const {
        redirect_url,
        encrypted_multiscan_qr_enc_code,
        encrypted_multiscan_qr_secret,
      } = dispenser 
      const multiscanQREncCode = decrypt(encrypted_multiscan_qr_enc_code, dashboardKey)
      const originalLink = `${claimAppURL}/#/mqr/${decrypt(encrypted_multiscan_qr_secret, dashboardKey)}/${multiscanQREncCode}`
      const claimURLDecrypted = isDeeplink ? isDeeplink.replace('%URL%', encodeURIComponent(originalLink)) : originalLink
      const linkKey = ethers.utils.id(multiscanQREncCode)
      try {
        const redirectURLDecrypted = redirect_url ? decrypt(redirect_url, linkKey.replace('0x', '')) : ''
        return {
          claimURLDecrypted,
          redirectURLDecrypted
        }
      } catch (e) {
        console.log({ e })
        alertError('Some error occured. Please check console for more info')
        return {
          claimURLDecrypted,
          redirectURLDecrypted: ''
        }
      }
  }, dispenser ? [
    dispenser.encrypted_multiscan_qr_enc_code,
    dispenser.encrypted_multiscan_qr_secret,
    dispenser.redirect_url
  ] : []) 

  if (!dispenser || !dashboardKey) {
    return <Redirect to='/dispensers' />
  }

  const {
    dispenser_id,
    redirect_url,
    active,
    redirect_on,
    claim_duration,
    claim_start,
    links_count,
    encrypted_multiscan_qr_enc_code,
    encrypted_multiscan_qr_secret,
    multiscan_qr_id,
    title,
    links_claimed,
    links_assigned
  } = dispenser

  const currentStatus = defineDispenserStatus(
    claim_start,
    claim_duration,
    links_count || 0,
    active,
    redirect_on,
    redirect_url
  )
  const dispenserOptions = defineOptions(
    currentStatus,
    () => history.push(`/dispensers/edit/${dispenser.dispenser_id}`),
    () => pauseDispenser(id, () => {}),
    () => unpauseDispenser(id, () => {})
  )
  const claimStartWithNoOffset = moment(claim_start).utcOffset(0)
  const claimStartDate = claimStartWithNoOffset.format('MMMM D, YYYY')
  const claimStartTime = claimStartWithNoOffset.format('HH:mm:ss')

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
          text={claimURLDecrypted}
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
        hasRedirect={redirect_on}
        redirectUrl={redirectURLDecrypted}
        claimUrl={claimURLDecrypted}
        updateNewRedirectUrl={(
          newRedirectUrl,
          successCallback,
          errorCallback
        ) => {
          updateRedirectURL(
            dispenser_id as string,
            newRedirectUrl,
            encrypted_multiscan_qr_enc_code,
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
        linksAssigned={links_assigned || 0}
        linksClaimed={links_claimed || 0}
        downloadReport={() => downloadReport(dispenser_id as string)}
      />
      <AttentionContainer
        title='Got questions?'
        text='If you are facing troubles with dispenser app, read documentation or contacts us and we help resolve your issue'
        actions={[
          {
            title: 'Contact us',
            onClick: () => {
              plausibleApi.invokeEvent({
                eventName: 'contact',
                data: {
                  network: defineNetworkName(chainId),
                  component: 'dispenser'
                }
              })
              window.open('https://linkdrop.io/contact-us', '_blank')
            }
          },
          {
            title: 'Read FAQ',
            onClick: () => {
              plausibleApi.invokeEvent({
                eventName: 'view_docs',
                data: {
                  network: defineNetworkName(chainId),
                  component: 'dispenser'
                }
              })
              window.open('https://docs.linkdrop.io/how-tos/multi-scannable-qr-code', '_blank')
            }
          }
        ]}
      />
    </div>
    
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(Dispenser)