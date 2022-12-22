import { FC, useEffect, useState } from 'react'
import { useParams, Redirect } from 'react-router-dom'
import { TLinkParams, TQRSet, TQRStatus, TSelectOption, TQRItem, TLinkDecrypted } from 'types'
import { RootState, IAppDispatch } from 'data/store'
import { connect } from 'react-redux'
import { defineQRStatusName, downloadQRsAsCSV } from 'helpers'
import qrStatus from 'configs/qr-status'
import { QuantityPopup, LinksPopup, DownloadPopup } from './components'
import { Note, TextLink } from 'components/common'
import {
  WidgetInfo,
  WidgetValue,
  Buttons,
  WidgetButton,
  FileIcon,
  StyledSelect,
  WidgetSubtitleStyled,
  Paragraph
} from './styled-components'
import {
  WidgetComponent,
  Container,
  Aside,
  WidgetSubtitle,
  AsideRow,
  AsideValue
} from 'components/pages/common'
import * as asyncQRsActions from 'data/store/reducers/qrs/async-actions.tsx'

const mapStateToProps = ({
  campaigns: { campaigns },
  qrs: { qrs, loading, mappingLoader, uploadLoader },
  user: { address, chainId, dashboardKey },
}: RootState) => ({
  campaigns,
  address,
  chainId,
  qrs,
  loading,
  dashboardKey,
  mappingLoader, uploadLoader
})

const mapDispatcherToProps = (dispatch: IAppDispatch) => {
  return {
    updateQRSetStatus: (
      setId: string | number,
      newStatus: TQRStatus,
      callback: () => void
    ) => dispatch(asyncQRsActions.updateQRSetStatus({ setId, newStatus, callback })),

    updateQRSetQuantity: (
      setId: string | number,
      quantity: number,
      callback: () => void
    ) => dispatch(asyncQRsActions.updateQRSetQuantity({ setId, quantity, callback })),

    mapQRsToLinks: (
      setId: string,
      links: TLinkDecrypted[],
      qrs: TQRItem[],
      callback?: () => void,
    ) => dispatch(asyncQRsActions.mapQRsWithLinks({ setId, links, qrs, callback })),

    getQRsArray: (setId: string | number) => dispatch(asyncQRsActions.getQRs({ setId })),
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

const QR: FC<ReduxType> = ({
  qrs,
  updateQRSetStatus,
  loading,
  mapQRsToLinks,
  updateQRSetQuantity,
  getQRsArray,
  mappingLoader,
  uploadLoader,
  dashboardKey
}) => {
  const { id } = useParams<TLinkParams>()
  const qr: TQRSet | undefined = qrs.find(qr => String(qr.set_id) === id)
  const [ status, setStatus ] = useState<TSelectOption | null>(null)

  const [
    updateQuantityPopup,
    toggleUpdateQuantityPopup
  ] = useState<boolean>(false)
  const [
    updateLinksPopup,
    toggleUpdateLinksPopup
  ] = useState<boolean>(false)
  const [
    downloadPopup,
    toggleDownloadPopup
  ] = useState<boolean>(false)

  const selectOptions: TSelectOption<TQRStatus>[] = qrStatus.map(status => ({
    label: defineQRStatusName(status),
    value: status
  })) 

  useEffect(() => {
    if (!qr) { return }
    const option = selectOptions.find(item => item.value === qr.status)
      if (!option) { return }
      setStatus(option)
  }, [qr])

  useEffect(() => {
    if (!qr) { return }
    if (!qr.set_id) { return }
    getQRsArray(qr.set_id)
  }, [])

  if (!qr) {
    return <Redirect to='/qrs' /> 
  }

  const defineIfDisabled = () => {
    return !qr.qr_array || !dashboardKey || loading
  }

  const defineAsideContent = (uploaded?: boolean) => {
    if (!uploaded) {
      return <>
        <Paragraph>
          Upload a CSV file with links. Number of rows in the file should be equal to the number of QR codes. 
        </Paragraph>
        <Paragraph>
          If you haven’t created claim links yet, then do it in <TextLink to='/campaigns'>Campaigns</TextLink>
        </Paragraph>
        <Note>
        You will not be able to change the quantity of QRs after uploading links
        </Note>
      </>
    }
    return <>
      <Paragraph>
        Claim links are successfully connected to QR codes
      </Paragraph>
      <AsideRow>
        <AsideValue>
          <FileIcon />file.csv
        </AsideValue>
        <AsideValue>
          <WidgetButton
            size='small'
            disabled={false}
            appearance='additional'
            title='Change file'
            onClick={() => {
              toggleUpdateLinksPopup(true)
            }}
          />
        </AsideValue>
      </AsideRow>
    </>
  }

  return <Container>
   {updateQuantityPopup && <QuantityPopup
      onClose={() => toggleUpdateQuantityPopup(false)}
      quantity={qr.qr_quantity}
      loading={loading}
      loader={uploadLoader}
      onSubmit={value => {
        if (!id) { return }
        updateQRSetQuantity(
          id,
          Number(value),
          () => { toggleUpdateQuantityPopup(false) }
        )}
      }
    />}

    {updateLinksPopup && <LinksPopup
      quantity={qr.qr_quantity}
      loader={mappingLoader}
      loading={loading}
      onClose={() => toggleUpdateLinksPopup(false)}
      onSubmit={links => {
        if (!id || !qr.qr_array) { return }
        mapQRsToLinks(id, links, qr.qr_array, () => {
          toggleUpdateLinksPopup(false)
        })
      }}
    />}

    {id && downloadPopup && <DownloadPopup
      id={id}  
      onClose={() => toggleDownloadPopup(false)}
    />}
    <WidgetComponent title='Manage set'>
      <WidgetSubtitle>Manage the quantity of QR codes and track their status</WidgetSubtitle>
      <WidgetSubtitleStyled>
        Quantity of QRs
      </WidgetSubtitleStyled>
      <WidgetInfo>
        <WidgetValue>
          {qr.qr_quantity}
        </WidgetValue>
        <WidgetButton
          title='Change quantity'
          size='small'
          appearance='additional'
          disabled={qr.links_uploaded || qr.status !== 'NOT_SENT_TO_PRINTER'}
          onClick={() => {
            toggleUpdateQuantityPopup(true)
          }}
        />
      </WidgetInfo>
      <StyledSelect
        options={selectOptions}
        title='Status'
        value={status ? status : undefined}
        onChange={option => {
          if (!id) { return }
          updateQRSetStatus(
            id,
            option.value as TQRStatus,
            () => { setStatus(option) }
          )
        }}
        placeholder='Status'
      />
      <Buttons>
        <WidgetButton
          title='Back'
          appearance='default'
          to='/qrs'
        /> 
        <WidgetButton
          title='Download'
          appearance='action'
          
          onClick={() => {
            toggleDownloadPopup(true)
          }}
        /> 
        <WidgetButton
          title='Download (as CSV)'
          appearance='action'
          disabled={defineIfDisabled()}
          onClick={() => {
            if (!qr.qr_array || !dashboardKey) { return }
            downloadQRsAsCSV(
              qr.qr_array,
              qr.set_name,
              dashboardKey,
              qr.created_at
            )
          }}
        />
      </Buttons>
    </WidgetComponent>
    <Aside
      title="Connect to claim links"
      back={{}}
      next={qr.links_uploaded ? {} : {
        title: 'Upload file',
        action: () => {
          toggleUpdateLinksPopup(true)
        }
      }}
    >
      {defineAsideContent(qr.links_uploaded)}
    </Aside>
  </Container>


  // return <Container>
  

  //   <WidgetComponent title={qr.set_name}>
  //     <WidgetInfo>
  //       <WidgetSubtitle>
  //         Quantity: {qr.qr_quantity} QRs
  //       </WidgetSubtitle>
  //       <WidgetValue>
  //         <Buttons>
  //           <WidgetButton
  //             title='Change quantity'
  //             disabled={qr.links_uploaded || qr.status !== 'NOT_SENT_TO_PRINTER'}
  //             onClick={() => {
  //               toggleUpdateQuantityPopup(true)
  //             }}
  //           />
  //           <WidgetButton
  //             title='Download'
  //             appearance='action'
              
  //             onClick={() => {
  //               toggleDownloadPopup(true)
  //             }}
  //           /> 
  //         </Buttons>
  //       </WidgetValue>
  //       <WidgetSubtitle>
  //         Status
  //       </WidgetSubtitle>
  //       <WidgetValue>
  //        
  //       </WidgetValue>
  //     </WidgetInfo>

  //     <WidgetInfo>
  //       <WidgetSubtitle>
  //         Claimable links:
  //         <LinksIndicator>
  //           {qr.links_uploaded ? `${qr.qr_quantity} link(s) <--> ${qr.qr_array?.length} QR(s)` : 'No links uploaded'}
  //         </LinksIndicator>
  //       </WidgetSubtitle>
  //       <WidgetValue>
  //         <WidgetButton
  //           title={qr.links_uploaded ? 'Change links' : 'Upload links'}
  //           onClick={() => {
  //             toggleUpdateLinksPopup(true)
  //           }}
  //         />
  //       </WidgetValue>
  //       <WidgetSubtitle />
  //       <WidgetValue>
  //         Upload a CSV file with links, file should include number of rows 
  //         equivalent to a number of QR codes
  //       </WidgetValue>
  //     </WidgetInfo>
          
  //   </WidgetComponent>
  // </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(QR)