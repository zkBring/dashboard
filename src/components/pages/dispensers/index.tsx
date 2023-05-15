import { FC } from 'react'
import {
  Container,
  Header,
  WidgetTitleStyled,
  ContainerButton,
  DispensersListLabelStyled,
  DispensersListValueStyled,
  DispensersListStyled,
  SecondaryTextSpan
} from './styled-components'
import { Button } from 'components/common'
import {
  BatchListLabel,
  BatchListValue,
  WidgetComponent,
  ErrorSpan,
  UploadedSpan
} from 'components/pages/common'
import { TDispenserStatus } from 'types'
import { formatDate, formatTime, defineDispenserStatus, defineDispenserStatusName } from 'helpers'
import { RootState, IAppDispatch } from 'data/store'
import { connect } from 'react-redux'
import * as asyncQRsActions from 'data/store/reducers/qrs/async-actions.tsx'
import moment from 'moment'
import Icons from 'icons'

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

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

const defineStatusAppearance = (status: TDispenserStatus) => {
  const statusName = defineDispenserStatusName(status)
  if (status === 'NOT_UPLOADED') {
    return <ErrorSpan>
      <Icons.NotUploadedIcon />
      {statusName}
    </ErrorSpan>
  }

  return <UploadedSpan>{statusName}</UploadedSpan>
}

const Dispensers: FC<ReduxType> = ({
  addQRSet,
  dispensers,
  loading
}) => {

  return <Container>
    <WidgetComponent>
      <Header>
        <WidgetTitleStyled>My dispensers</WidgetTitleStyled>
        <ContainerButton
          title='+ Create new'
          disabled={loading}
          size='extra-small'
          appearance='action'
          to='/dispensers/new'
        />
      </Header>
      {dispensers.length > 0 && <DispensersListStyled>
        <BatchListLabel>Date created</BatchListLabel>
        <BatchListLabel>Title</BatchListLabel>
        <BatchListLabel>Start date (UTC+0)</BatchListLabel>
        <BatchListLabel>Duration</BatchListLabel>
        <BatchListLabel>Links</BatchListLabel>
        <BatchListLabel>Status</BatchListLabel>
        <BatchListLabel></BatchListLabel>
        {dispensers.map(dispenser => {
          const { title, links_count, dispenser_id, claim_duration, created_at, claim_start } = dispenser
          const currentStatus = defineDispenserStatus(claim_start, claim_duration, links_count || 0)
          const dateCreatedFormatted = formatDate(created_at || '')
          const timeCreatedFormatted = formatTime(created_at || '')
          const claimStartWithNoOffset = moment(claim_start).utcOffset(0)
          const claimStartDate = claimStartWithNoOffset.format('MMMM D, YYYY')
          const claimStartTime = claimStartWithNoOffset.format('HH:mm:ss')
          return <>
            <BatchListValue>
              {dateCreatedFormatted}, <SecondaryTextSpan>{timeCreatedFormatted}</SecondaryTextSpan>
            </BatchListValue>
            <DispensersListLabelStyled>{title}</DispensersListLabelStyled>
            <BatchListValue>
              {claimStartDate}, <SecondaryTextSpan>{claimStartTime}</SecondaryTextSpan>
            </BatchListValue>
            <BatchListValue>{claim_duration} min(s)</BatchListValue>
            <BatchListValue>
              {links_count || 0}
            </BatchListValue>
            <BatchListValue>{defineStatusAppearance(currentStatus)}</BatchListValue>
            <DispensersListValueStyled>
              <Button
                appearance='additional'
                size='extra-small'
                title='Manage'
                to={`/dispensers/${dispenser_id}`}
              />
            </DispensersListValueStyled>
          </>
        })}
      </DispensersListStyled>}
      
    </WidgetComponent>
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(Dispensers)
