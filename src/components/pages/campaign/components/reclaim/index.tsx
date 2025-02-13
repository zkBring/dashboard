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
  dashboardKey
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
  decryptDispenserData: () => void,
  reclaimUrl?: string,
  dashboardKey?: string | null
) => {

  if (!dashboardKey) {
    return <ButtonStyled
      title='Show Drop URL'
      appearance='action'
      onClick={decryptDispenserData}
    /> 
  }

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
  decryptDispenserData
}) => {
  const dispenser: TDispenser | undefined = dispensers.find(dispenser => String(dispenser.dispenser_id) === reclaimId)
  console.log({ dispensers, reclaimId })
  useEffect(() => {
    if (!dispenser) { return }
    getDispenserData(dispenser.multiscan_qr_id as string)
  }, [])

  useEffect(() => {
    if (!dispenser) { return }
    if (!dashboardKey) { return }
    if (!reclaimId) { return }
    decryptDispenserData(reclaimId)
  }, [
    dashboardKey,
    dispenser?.whitelist_on,
    dispenser?.redirect_on,
    dispenser?.reclaim
  ])

  console.log({ dispenser })

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
    links_claimed,
    links_assigned,
    claim_finish,
    timeframe_on,
    dispenser_url,
    // reclaim_app_id,
    // reclaim_app_secret,
    // reclaim_provider_id,
    instagram_follow_id
  } = dispenser

  return <ReclaimContainer>
    {dispenser_url &&
    instagram_follow_id &&
    // reclaim_app_id &&
    // reclaim_app_secret &&
    // reclaim_provider_id &&
    <CopyContainerStyled
      title='Reclaim Drop URL'
      text={dispenser_url}
    />}

    {renderMainButton(
      () => decryptDispenserData(reclaimId as string),
      dispenser_url,
      dashboardKey
    )}
  </ReclaimContainer>
}

export default connect(
  mapStateToProps,
  mapDispatcherToProps
) (
  Reclaim
)
