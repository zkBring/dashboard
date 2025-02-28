import { FC, useEffect } from 'react'
import TProps from './types'
import {
  ReclaimContainer,
  ButtonStyled,
  CopyContainerStyled
} from './styled-components'
import { RootState } from 'data/store'
import { connect } from 'react-redux'
import { TDispenser } from 'types'
import { DispensersActions } from 'data/store/reducers/dispensers/types'
import { Dispatch } from 'redux'
import {
  defineClaimAppURL,
  defineDispenserAppUrl
} from 'helpers'
import * as asyncDispensersActions from 'data/store/reducers/dispensers/async-actions'
import * as dispensersActions from 'data/store/reducers/dispensers/actions'
import { IAppDispatch } from 'data/store'

const mapStateToProps = ({
  dispensers: {
    dispensers
  },
  user: { address, chainId, dashboardKey },
}: RootState) => ({
  dispensers,
  dashboardKey,
  address
})

const mapDispatcherToProps = (dispatch: IAppDispatch & Dispatch<DispensersActions>) => {
  return {
    getDispenserData: (
      multiscan_qr_id: string
    ) => dispatch(asyncDispensersActions.getDispenserData({
      multiscan_qr_id
    })),

    downloadReport: (
      dispenser_id: string,
    ) => dispatch(asyncDispensersActions.downloadReport(
      dispenser_id
    )),

    decryptDispenserData: (
      dispenser_id: string
    ) => {
      dispatch(asyncDispensersActions.decryptDispenserData(
        { dispenser_id }
      ))
    },

    reclaimSubmit: (
      dispenserId: string,
      instagramFollowId: string,
      onSuccess?: () => void,
      onError?: () => void
    ) => {
      dispatch(
        asyncDispensersActions.updateReclaim({
          dispenserId,
          // reclaimAppId,
          // reclaimAppSecret,
          // reclaimProviderId,
          instagramFollowId,
          successCallback: onSuccess,
          errorCallback: onError
        }) 
      )
    }
  }
}

const renderMainButton = (
  reclaimUrl?: string,
) => {

  return <ButtonStyled
    title='Launch Reclaim App'
    onClick={() => {
      if (reclaimUrl) {
        window.open(reclaimUrl, '_blank')
        return 
      }

      alert('Redirect URL not defined')

    }}
  /> 
}

// @ts-ignore
type ReduxType = ReturnType<typeof mapStateToProps>  & ReturnType<typeof mapDispatcherToProps>

const Reclaim: FC<TProps & ReduxType> = ({
  reclaimId,
  dispensers,
  getDispenserData,
  reclaimSubmit,
  dashboardKey,
  decryptDispenserData,
  address
}) => {
  const dispenser: TDispenser | undefined = dispensers.find(dispenser => String(dispenser.dispenser_id) === reclaimId)
  useEffect(() => {
    if (!dispenser) { return }
    getDispenserData(dispenser.multiscan_qr_id as string)
  }, [])

  if (!dispenser) {
    return null
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
    links_claimed,
    links_assigned,
    claim_finish,
    timeframe_on,
    dispenser_url,
  } = dispenser

  const claimAppURL = defineClaimAppURL(
    address
  )
  const claimURLDecrypted = defineDispenserAppUrl(
    claimAppURL,
    encrypted_multiscan_qr_secret,
    encrypted_multiscan_qr_enc_code,
    false,
    false,
    true
  )

  return <ReclaimContainer>
    {claimURLDecrypted &&
    <CopyContainerStyled
      title='Reclaim Drop URL'
      text={claimURLDecrypted as string}
    />}

    {renderMainButton(
      claimURLDecrypted
    )}
  </ReclaimContainer>
}

export default connect(
  mapStateToProps,
  mapDispatcherToProps
) (
  Reclaim
)
