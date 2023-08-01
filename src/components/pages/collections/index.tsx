import { FC } from 'react'
import {
  Container,
  Header,
  WidgetTitleStyled,
  ContainerButton,
  CollectionsListLabelStyled,
  CollectionsListValueStyled,
  CollectionsListStyled,
  SecondaryTextSpan
} from './styled-components'
import { Button } from 'components/common'
import {
  BatchListLabel,
  BatchListValue,
  WidgetComponent,
} from 'components/pages/common'
import { formatDate, formatTime } from 'helpers'
import { RootState, IAppDispatch } from 'data/store'
import { connect } from 'react-redux'
import * as asyncQRsActions from 'data/store/reducers/qrs/async-actions.tsx'
import moment from 'moment'

const mapStateToProps = ({
  campaigns: { campaigns },
  collections: { collections, loading },
  user: { address, chainId },
}: RootState) => ({
  campaigns,
  address,
  chainId,
  collections,
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

const Collections: FC<ReduxType> = ({
  addQRSet,
  collections,
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
      {collections.length > 0 && <CollectionsListStyled>
        <BatchListLabel>Title</BatchListLabel>
        <BatchListLabel>Date created</BatchListLabel>
        <BatchListLabel>Address</BatchListLabel>
        <BatchListLabel>All Tokens & Copies</BatchListLabel>
        <BatchListLabel>Actions</BatchListLabel>
        {collections.map(collection => {
          const { title, collection_id, created_at, tokens_amount, address } = collection
          const dateCreatedFormatted = formatDate(created_at || '')
          const timeCreatedFormatted = formatTime(created_at || '')
          return <>
            <CollectionsListLabelStyled>{title}</CollectionsListLabelStyled>
            <BatchListValue>
              {dateCreatedFormatted}, <SecondaryTextSpan>{timeCreatedFormatted}</SecondaryTextSpan>
            </BatchListValue>
            <BatchListValue>
              {address}
            </BatchListValue>
            <BatchListValue>
              {tokens_amount}
            </BatchListValue>
            <BatchListValue>...</BatchListValue>
            <CollectionsListValueStyled>
              <Button
                appearance='additional'
                size='extra-small'
                title='Manage'
                to={`/collections/${collection_id}`}
              />
            </CollectionsListValueStyled>
          </>
        })}
      </CollectionsListStyled>}
      
    </WidgetComponent>
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(Collections)
