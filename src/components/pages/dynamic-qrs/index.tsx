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
} from 'components/pages/common'
import { formatDate, formatTime, defineDispenserStatus, defineDispenserStatusTag } from 'helpers'
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

const DynamicQRs: FC<ReduxType> = ({
  addQRSet,
  dispensers,
  loading
}) => {

  // @ts-ignore
  const dynamicQrs = dispensers.filter(dispenser => dispenser.dynamic)

  return <Container>
    <WidgetComponent>
      <Header>
        <WidgetTitleStyled>Dynamic QR code</WidgetTitleStyled>
        <ContainerButton
          title='+ New'
          disabled={loading}
          size='extra-small'
          appearance='action'
          to='/dynamic-qrs/new'
        />
      </Header>
      {dynamicQrs.length > 0 && <DispensersListStyled>
        <BatchListLabel>Date created</BatchListLabel>
        <BatchListLabel>Title</BatchListLabel>
        <BatchListLabel>Start date (UTC+0)</BatchListLabel>
        <BatchListLabel>Links</BatchListLabel>
        <BatchListLabel>Status</BatchListLabel>
        <BatchListLabelTextAlignRight>Actions</BatchListLabelTextAlignRight>
        {dynamicQrs.map(dispenser => {
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
            redirect_url
          } = dispenser

          const currentStatus = defineDispenserStatus(
            claim_start as number,
            (claim_finish as number) || claim_start as number + (claim_duration || 1000000000000),
            links_count || 0,
            active,
            redirect_on,
            redirect_url
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
                to={`/dynamic-qrs/${dispenser_id}`}
              />
            </BatchListValueJustifySelfEnd>
          </>
        })}
      </DispensersListStyled>}
      
    </WidgetComponent>
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(DynamicQRs)
