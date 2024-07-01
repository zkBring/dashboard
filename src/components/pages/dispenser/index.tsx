import { FC, useState, useMemo, useEffect } from 'react'
import { RootState, IAppDispatch } from 'data/store'
import {
  Container,
  WidgetSubtitle,
  DownloadQRPopup
} from 'components/pages/common'
import {
  Buttons,
  WidgetButton,
  WidgetComponentStyled,
  CopyContainerStyled,
  Counter,
  SecondaryTextSpan,
  DynamicQRImage,
  MainContent
} from './styled-components'
import {
  Statistics,
  WhitelistWidget,
  Status,
  Settings,
  ClaimLinks,
  QRCode
} from './components'
import DynamicQRImageSrc from 'images/dynamic-qr.png'
import { TextLink } from 'components/common'
import {
  defineDispenserStatus,
  defineIfQRIsDeeplink,
  defineDispenserStatusTag,
  alertError,
  defineDispenserAppUrl
} from 'helpers'
import { Redirect, useHistory, useParams } from 'react-router-dom'
import {
  TDispenser,
  TDispenserStatus,
  TLinkDecrypted,
  TDispenserWhitelistType,
  TDispenserWhitelistItemAddress
} from 'types'
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
  dispensers: {
    dispensers,
    loading,
    mappingLoader,
    currentDispenserData
  },
  user: { address, chainId, dashboardKey },
}: RootState) => ({
  campaigns,
  address,
  chainId,
  dispensers,
  loading,
  dashboardKey,
  mappingLoader,
  currentDispenserData
})

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
      whitelistOn: boolean,
      dynamic: boolean,
      callback?: () => void
    ) => dispatch(asyncDispensersActions.downloadDispenserQR({
      multiscan_qr_id,
      encrypted_multiscan_qr_secret,
      encrypted_multiscan_qr_enc_code,
      qrDispenserName,
      width: size,
      height: size,
      whitelist_on: whitelistOn,
      dynamic,
      callback
    })),
    
    getDispenserStats: (
      dispenser_id: string,
      multiscan_qr_id: string,
      callback?: () => void
    ) => dispatch(asyncDispensersActions.getDispenserStats({
      dispenser_id,
      multiscan_qr_id,
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
      encrypted_multiscan_qr_enc_code: string,
      successCallback?: () => void,
      errorCallback?: () => void
    ) => dispatch(asyncDispensersActions.updateRedirectURL({
      dispenser_id,
      redirect_url,
      encrypted_multiscan_qr_enc_code,
      successCallback,
      errorCallback
    })),
    toggleWhitelist: (
      dispenser_id: string,
      whitelist_on: boolean,
      successCallback: () => void,
      errorCallback: () => void
    ) => dispatch(asyncDispensersActions.toggleWhitelistOn({
      dispenser_id,
      whitelist_on,
      successCallback,
      errorCallback
    })),
    downloadReport: (
      dispenser_id: string,
    ) => dispatch(asyncDispensersActions.downloadReport(
      dispenser_id
    )),


    createAddressWhitelist: (
      dispenserId: string,
      whitelist: string[],
      whitelistType: TDispenserWhitelistType,
      successCallback?: () => void,
      errorCallback?: () => void
    ) => dispatch(asyncDispensersActions.createWhitelist({
      dispenser_id: dispenserId,
      whitelist,
      whitelist_type: whitelistType,
      successCallback,
      errorCallback
    })),
    updateAddressWhitelist: (
      dispenserId: string,
      whitelist: string[],
      whitelistType: TDispenserWhitelistType,
      successCallback?: () => void,
      errorCallback?: () => void
      // @ts-ignore
    ) => dispatch(asyncDispensersActions.updateWhitelist({
      dispenser_id: dispenserId,
      whitelist,
      whitelist_type: whitelistType,
      successCallback,
      errorCallback
    })),
    getDispenserWhitelist: (
      dispenser_id: string,
      callback?: () => void
    ) => dispatch(asyncDispensersActions.getDispenserWhitelist({
      dispenser_id,
      callback
    })),
  }
}

const defineTitle = (
  dynamic: boolean
) => {
  return dynamic ? 'Dynamic QR code web page' : 'Dispenser web page'
}

const defineSubtitle = (
  dynamic: boolean
) => {
  return dynamic ? 
    'Dispenser app is represented by a single link or QR code that you can share for multiple users to scan to claim a unique token. Scanning is limited within a certain timeframe' :
    'Linkdrop Dispenser is represented by a single link that you can share for multiple users to scan-to-claim an unique token'
}


const renderMainButton = (
  dynamic: boolean,
  toggleDownloadPopup: (downloadPopup: boolean) => void,
  redirectUrl?: string
) => {
  const title = !dynamic ? 'Download PNG' : 'Launch Dynamic QR App'
  return <WidgetButton
    title={title}
    appearance='action'
    onClick={() => {
      if (!dynamic) {
        toggleDownloadPopup(true)
        return
      }

      if (redirectUrl) {
        window.open(redirectUrl, '_blank')
      }

      alert('Redirect URL not defined')

    }}
  /> 
}

const defineQRItem = (
  dynamic: boolean,
  link: string,
  address: string
) => {

  if (dynamic) {
    return <DynamicQRImage src={DynamicQRImageSrc} />
  }

  return <QRCode link={link} address={address} />
}

// @ts-ignore
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
  createAddressWhitelist,
  updateRedirectURL,
  toggleRedirectURL,
  getDispenserStats,
  downloadReport,
  toggleWhitelist,
  chainId,
  updateAddressWhitelist,
  currentDispenserData
}) => {
  const { id } = useParams<{id: string}>()
  // @ts-ignore
  const dispenser: TDispenser | undefined = dispensers.find(dispenser => String(dispenser.dispenser_id) === id)


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
      dispenser.multiscan_qr_id as string,
      () => setStatsLoading(false)
    )
  }, [])
  const claimAppURL = defineClaimAppURL(
    address
  )

  const {
    claimURLDecrypted,
    redirectURLDecrypted
  } = useMemo<{claimURLDecrypted: string, redirectURLDecrypted: string}>(() => {
    if (!dispenser || !dashboardKey) { return { claimURLDecrypted: '', redirectURLDecrypted: '' } }
      const {
        redirect_url,
        encrypted_multiscan_qr_enc_code,
        encrypted_multiscan_qr_secret,
        whitelist_on,
        dynamic
      } = dispenser 
      const multiscanQREncCode = decrypt(encrypted_multiscan_qr_enc_code, dashboardKey)
      const decryptedMultiscanQRSecret = decrypt(encrypted_multiscan_qr_secret, dashboardKey)
      // 
      const claimURLDecrypted = defineDispenserAppUrl(
        claimAppURL,
        decryptedMultiscanQRSecret,
        multiscanQREncCode,
        Boolean(whitelist_on),
        Boolean(dynamic)
      )

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
    dispenser.redirect_url,
    dispenser.whitelist_on
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
    links_assigned,
    whitelist_on,
    whitelist_type,
    dynamic
  } = dispenser

  const currentStatus = defineDispenserStatus(
    claim_start,
    claim_duration,
    links_count || 0,
    active,
    redirect_on,
    redirect_url
  )

  const claimStartWithNoOffset = moment(claim_start).utcOffset(0)
  const claimStartDate = claimStartWithNoOffset.format('MMMM D, YYYY')
  const claimStartTime = claimStartWithNoOffset.format('HH:mm:ss')

  const mainButton = renderMainButton(
    dynamic as boolean,
    toggleDownloadPopup,
    claimURLDecrypted
  )

  const qrCodeContainer = defineQRItem(
    Boolean(dynamic),
    claimURLDecrypted,
    address
  )

  return <Container>
    {id && downloadPopup && <DownloadQRPopup
      onSubmit={(size: number) => {
        downloadQR(
          size,
          multiscan_qr_id,
          encrypted_multiscan_qr_secret,
          encrypted_multiscan_qr_enc_code,
          title,
          Boolean(whitelist_on),
          Boolean(dynamic),
          () => { toggleDownloadPopup(false) }
        )
      }}
      onClose={() => toggleDownloadPopup(false)}
    />}

    <MainContent>
      <WidgetComponentStyled title={defineTitle(Boolean(dynamic))}>
        <WidgetSubtitle>
          {defineSubtitle(Boolean(dynamic))}
        </WidgetSubtitle>
        
        {qrCodeContainer}

        <CopyContainerStyled
          text={claimURLDecrypted}
        />
        
        <Buttons>
          {mainButton}
        </Buttons>
      </WidgetComponentStyled>
      {!dynamic && <WhitelistWidget
        loading={loading}
        isWhitelisted={whitelist_on}
        whitelistType={whitelist_type}
        dispenserId={dispenser_id as string}
        toggleWhitelistOn={(
          whitelistOn
        ) => {
          toggleWhitelist(
            dispenser_id as string,
            whitelistOn,
            () => alert('success'),
            () => alert('error'),
          )
        }}
      />}
    </MainContent>


    <div>
      <Status status={currentStatus} />
      <Statistics
        linksCount={links_count || 0}
        dispenserStatus={currentStatus}
        linksAssigned={links_assigned || 0}
        linksClaimed={links_claimed || 0}
        downloadReport={() => downloadReport(dispenser_id as string)}
      />

      <ClaimLinks
        pauseDispenser={pauseDispenser}
        unpauseDispenser={unpauseDispenser}
        downloadReport={downloadReport}
        dispenserId={dispenser_id as string}
        dispenserStatus={currentStatus}
        loading={loading}
        mappingLoader={mappingLoader}
        encryptedMultiscanQREncCode={encrypted_multiscan_qr_enc_code}
        linksCount={links_count || 0}
        addLinksToQR={addLinksToQR}


        // not available
        campaignData={currentDispenserData.campaign}
      />


      <Settings
        redirectUrl={redirectURLDecrypted}
        claimUrl={claimURLDecrypted}
        campaignData={currentDispenserData.campaign}

        whitelistToggleValue={whitelist_on}

        whitelistToggleAction={(
          whitelistOn
        ) => {
          toggleWhitelist (
            dispenser_id as string,
            whitelistOn,
            () => {
              alert('success')
            },
            () => alert('error')
          )
        }}

        whitelistSubmit={(
          whitelistAdresses,
          onSuccess
        ) => {
          if (whitelist_on) {
            return updateAddressWhitelist(
              dispenser_id as string,
              whitelistAdresses,
              'address',
              onSuccess,
              () => alert('error')
            )
          }

          createAddressWhitelist(
            dispenser_id as string,
            whitelistAdresses,
            'address',
            onSuccess,
            () => alert('error')
          )
          
        }}

        redirectToggleAction={(
          redirectOn
        ) => {
          toggleRedirectURL(
            dispenser_id as string,
            redirectOn,
            () => {
              alert('success')
            },
            () => alert('error'),
          )
        }}
        redirectToggleValue={redirect_on}
        redirectSubmit={(
          newRedirectUrl,
          onSuccess
        ) => {
          updateRedirectURL(
            dispenser_id as string,
            newRedirectUrl,
            encrypted_multiscan_qr_enc_code,
            onSuccess,
            () => alert('error')
          )
        }}
      />
    </div>
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(Dispenser)