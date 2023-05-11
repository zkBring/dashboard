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
  WidgetComponent
} from 'components/pages/common'
import { formatDate, formatTime } from 'helpers'
import { RootState, IAppDispatch } from 'data/store'
import { connect } from 'react-redux'
import * as asyncQRsActions from 'data/store/reducers/qrs/async-actions.tsx'

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
          const dateCreatedFormatted = formatDate(dispenser.created_at || '')
          const timeCreatedFormatted = formatTime(dispenser.created_at || '')
          return <>
            <BatchListValue>
              {dateCreatedFormatted} <SecondaryTextSpan>{timeCreatedFormatted}</SecondaryTextSpan>
            </BatchListValue>
            <DispensersListLabelStyled>{dispenser.title}</DispensersListLabelStyled>
            <BatchListValue>
              {dispenser.claim_start }
            </BatchListValue>
            <BatchListValue>{dispenser.claim_duration} min(s)</BatchListValue>
            <BatchListValue>
              {dispenser.claim_links_count}
            </BatchListValue>
            <BatchListValue>{dispenser.status}</BatchListValue>
            <DispensersListValueStyled>
              <Button
                appearance='additional'
                size='extra-small'
                title='Manage'
                to={`/dispensers/${dispenser.dispenser_id}`}
              />
            </DispensersListValueStyled>
          </>
        })}
      </DispensersListStyled>}
      
    </WidgetComponent>
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(Dispensers)
