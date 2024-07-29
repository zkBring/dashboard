import { FC } from 'react'
import {
  Container,
  Header,
  WidgetTitleStyled,
  ContainerButton,
  DispensersListValueFixed,
  DispensersListStyled,
  SecondaryTextSpan,
  BatchListLabelTextAlignRight,
  BatchListValueJustifySelfEnd
} from './styled-components'
import { Button } from 'components/common'
import {
  BatchListLabel,
  BatchListValue,
  WidgetComponent,
  InitialNote
} from 'components/pages/common'
import {
  formatDate,
  formatTime,
  defineDispenserStatus, 
  defineDispenserStatusTag
} from 'helpers'
import { RootState, IAppDispatch } from 'data/store'
import { connect } from 'react-redux'
import * as asyncQRsActions from 'data/store/reducers/qrs/async-actions.tsx'
import moment from 'moment'

const mapStateToProps = ({
  campaigns: { campaigns },
  dispensers: { dispensers, loading },
  user: { address, chainId },
}: RootState) => ({
  campaigns,
  address,
  chainId,
  dispensers,
  loading
})

const mapDispatcherToProps = (dispatch: IAppDispatch) => {
  return {
    addQRSet: (
      title: string,
      quantity: number,
      callback: (id: string | number) => void
    ) => dispatch(asyncQRsActions.addQRSet({ title, quantity, callback }))
  }
}

// @ts-ignore
type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

const Dispensers: FC<ReduxType> = ({
  addQRSet,
  dispensers,
  loading
}) => {

  const notDynamicQrs = dispensers.filter(dispenser => !dispenser.dynamic)

  if (notDynamicQrs.length === 0) {
    return <InitialNote
      title='Create Your First Dispenser QR'
      text="Your Dispenser QRs will be displayed here once created. You don't have any Dispenser QRs yet"
      href='/dispensers/new'
      buttontText='New Dispenser QR'
    />
  }

  return <Container>
    <WidgetComponent>
      <Header>
        <WidgetTitleStyled>Dispenser QR code</WidgetTitleStyled>
        <ContainerButton
          title='+ New'

          disabled={loading}
          size='extra-small'
          appearance='action'
          to='/dispensers/new'
        />
      </Header>
      {notDynamicQrs.length > 0 && <DispensersListStyled>
        <BatchListLabel>Date created</BatchListLabel>
        <BatchListLabel>Title</BatchListLabel>
        <BatchListLabel>Start date (UTC+0)</BatchListLabel>
        <BatchListLabel>Links</BatchListLabel>
        <BatchListLabel>Status</BatchListLabel>
        <BatchListLabelTextAlignRight>Actions</BatchListLabelTextAlignRight>
        {notDynamicQrs.map(dispenser => {
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
            timeframe_on
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
          const timeCreatedFormatted = formatTime(created_at || '')
          const claimStartWithNoOffset = moment(claim_start).utcOffset(0)
          const claimStartDate = claimStartWithNoOffset.format('MMMM D, YYYY')
          const claimStartTime = claimStartWithNoOffset.format('HH:mm:ss')
          return <>
            <BatchListValue>
              {dateCreatedFormatted}, <SecondaryTextSpan>{timeCreatedFormatted}</SecondaryTextSpan>
            </BatchListValue>
            <DispensersListValueFixed>{title}</DispensersListValueFixed>
            <BatchListValue>
              {claimStartDate}, <SecondaryTextSpan>{claimStartTime}</SecondaryTextSpan>
            </BatchListValue>
            <BatchListValue>
              {links_count || 0}
            </BatchListValue>
            <BatchListValue>{defineDispenserStatusTag(currentStatus)}</BatchListValue>
            <BatchListValueJustifySelfEnd>
              <Button
                appearance='additional'
                size='extra-small'
                title='Manage'
                to={`/dispensers/${dispenser_id}`}
              />
            </BatchListValueJustifySelfEnd>
          </>
        })}
      </DispensersListStyled>}
      
    </WidgetComponent>
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(Dispensers)
