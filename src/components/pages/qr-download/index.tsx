import { FC, useEffect, useState } from 'react'
import { useParams, Redirect } from 'react-router-dom'
import { TLinkParams, TQRSet, TQRStatus, TSelectOption, TLink, TQRItem, TLinkDecrypted } from 'types'
import { RootState, IAppDispatch } from 'data/store'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  Container,
  DownloadProgressBar
} from './styled-components'
import * as asyncQRsActions from 'data/store/reducers/qrs/async-actions.tsx'

const mapStateToProps = ({
  campaigns: { campaigns },
  qrs: { qrs, loading, downloadItems },
  user: { address, chainId, dashboardKey },
}: RootState) => ({
  campaigns,
  address,
  chainId,
  qrs,
  loading,
  dashboardKey,
  downloadItems
})

const mapDispatcherToProps = (dispatch: IAppDispatch) => {
  return {
    getQRsArray: (setId: string | number) => dispatch(asyncQRsActions.getQRs({ setId })),
    downloadQRs: (
      qrsArray: TQRItem[],
      qrSetName: string,
      callback: () => void
    ) => dispatch(asyncQRsActions.downloadQRs({ qrsArray, qrSetName, callback }))
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

const QR: FC<ReduxType> = ({
  qrs,
  downloadQRs,
  downloadItems
}) => {
  const { id } = useParams<TLinkParams>()
  const qr: TQRSet | undefined = qrs.find(qr => String(qr.set_id) === id)
  const history = useHistory()
  useEffect(() => {
    if (!qr || !qr.qr_array) { return alert('qr_array is not provided') }
    downloadQRs(qr.qr_array, qr.set_name, () => {
      history.push(`/qrs/${id}`)
    })
  }, [])


  if (!qr) {
    return <Redirect to='/qrs' /> 
  }

  return <Container>
    <DownloadProgressBar
      max={qr && qr.qr_quantity}
      current={(downloadItems || []).length}
    />

  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(QR)