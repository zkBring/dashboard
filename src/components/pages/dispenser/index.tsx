import { FC, useEffect, useState } from 'react'
import { RootState, IAppDispatch } from 'data/store'
import {
  Container,
  WidgetSubtitle,
  TableRow,
  TableText,
  TableValue,
  DownloadQRPopup
} from 'components/pages/common'
import {
  Buttons,
  WidgetButton,
  WidgetComponentStyled,
  CopyContainerStyled,
  AsideContent,
  AsideSubtitle,
  Counter
} from './styled-components'
import { TextLink } from 'components/common'
import { Redirect, useParams } from 'react-router-dom'
import { TDispenser, TLinkDecrypted } from 'types'
import { connect } from 'react-redux'
import { LinksPopup } from './components'
import * as asyncDispensersActions from 'data/store/reducers/dispensers/async-actions'
import { decrypt } from 'lib/crypto'

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

const mapDispatcherToProps = (dispatch: IAppDispatch) => {
  return {
    addLinksToQR: (
      dispenserId: string,
      links: TLinkDecrypted[],
      encryptedMultiscanQREncCode: string,
      callback?: () => void,
    ) => dispatch(asyncDispensersActions.addLinksToQR({
      dispenserId,
      links,
      encryptedMultiscanQREncCode,
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

const Dispenser: FC<ReduxType> = ({
  dispensers,
  loading,
  mappingLoader,
  addLinksToQR,
  dashboardKey,
  downloadQR
}) => {
  const { id } = useParams<{id: string}>()
  const dispenser: TDispenser | undefined = dispensers.find(dispenser => String(dispenser.dispenser_id) === id)

  useEffect(() => {
    if (!dispenser) { return }
    const { encrypted_multiscan_qr_secret, encrypted_multiscan_qr_enc_code } = dispenser
    setInitialized(true)
  }, [])

  const [
    updateLinksPopup,
    toggleUpdateLinksPopup
  ] = useState<boolean>(false)

  const [
    downloadPopup,
    toggleDownloadPopup
  ] = useState<boolean>(false)

  const [
    initialized,
    setInitialized
  ] = useState<boolean>(false)


  if (!dispenser || !dashboardKey) {
    return <Redirect to='/dispensers' />
  }

  const { title, multiscan_qr_id, dispenser_id, claim_duration, claim_start, claim_links_count, encrypted_multiscan_qr_enc_code, encrypted_multiscan_qr_secret } = dispenser 

  return <Container>
    {updateLinksPopup && <LinksPopup
      loader={mappingLoader}
      loading={loading}
      onClose={() => toggleUpdateLinksPopup(false)}
      onSubmit={links => {
        
        if (!dispenser_id) { return alert('Dispenser ID not found') }
        if (!encrypted_multiscan_qr_enc_code) { return alert('encrypted_multiscan_qr_enc_code not found') }
        if (!links) { return alert('Links not found') }

        addLinksToQR(dispenser_id, links, encrypted_multiscan_qr_enc_code, () => {
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
          title
        )
      }}
      onClose={() => toggleDownloadPopup(false)}
    />}
    <WidgetComponentStyled title={dispenser?.title || 'Untitled dispenser'}>
      <WidgetSubtitle>Dispenser app is represented by a single link or QR code that you can share for multiple users to scan to claim a unique token. Scanning is limited within a certain timeframe</WidgetSubtitle>
      <CopyContainerStyled
        text={initialized ? `https://claim.linkdrop.io/#/mqr/${decrypt(encrypted_multiscan_qr_secret, dashboardKey)}/${decrypt(encrypted_multiscan_qr_enc_code, dashboardKey)}` : 'Loading'}
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
    <WidgetComponentStyled
      title="Connect to claim links"
    >
      <WidgetSubtitle>
        Upload a CSV file with claim links in the required format. <TextLink>Download example file</TextLink> or <TextLink>read the docs</TextLink>.
      </WidgetSubtitle>
      <WidgetSubtitle>
        If you haven’t created claim links yet, then do it in <TextLink to='/campaigns'>Claim links</TextLink>
      </WidgetSubtitle>
      <AsideContent>
        <AsideSubtitle>Amount of links</AsideSubtitle>
        <Counter>{claim_links_count}</Counter>
        <TableRow>
          <TableText>Status</TableText>
          <TableValue>{claim_links_count === 0 ? 'Not uploaded' : dispenser.status}</TableValue>
        </TableRow>
        <TableRow>
          <TableText>Start date</TableText>
          <TableValue>{claim_start}</TableValue>
        </TableRow>
        <TableRow>
          <TableText>Duration</TableText>
          <TableValue>{claim_duration} mins</TableValue>
        </TableRow>
      </AsideContent>

      <WidgetButton
          title='Upload file'
          appearance='action'
          onClick={() => {
            toggleUpdateLinksPopup(true)
          }}
        /> 
    </WidgetComponentStyled>
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(Dispenser)