import { FC } from 'react'
import {
  Container,
  Header,
  WidgetTitleStyled,
  ContainerButton,
  CollectionsListLabelStyled,
  CollectionsListValueStyled,
  CollectionsListStyled,
  SecondaryTextSpan,
  CollectionsListLabelAligned,
  TokenImageStyled
} from './styled-components'
import { Button } from 'components/common'
import {
  BatchListLabel,
  BatchListValue,
  WidgetComponent,
} from 'components/pages/common'
import { formatDate, formatTime, shortenString, defineCollectionStatusTag } from 'helpers'
import { RootState, IAppDispatch } from 'data/store'
import { connect } from 'react-redux'
import * as asyncQRsActions from 'data/store/reducers/qrs/async-actions.tsx'

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

// ignore to avoid IDE problem, should be solved soon
// @ts-ignore
type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

const Collections: FC<ReduxType> = ({
  addQRSet,
  collections,
  loading
}) => {
  return <Container>
    <WidgetComponent>
      <Header>
        <WidgetTitleStyled>My NFT Contracts</WidgetTitleStyled>
        <ContainerButton
          title='+ Deploy new contract'
          disabled={loading}
          size='extra-small'
          appearance='action'
          to='/collections/new'
        />
      </Header>
      {collections.length > 0 && <CollectionsListStyled>
        <BatchListLabel>Title</BatchListLabel>
        <BatchListLabel>Date created</BatchListLabel>
        <BatchListLabel>Address</BatchListLabel>
        <BatchListLabel>All Tokens & Copies</BatchListLabel>
        <CollectionsListLabelAligned>Actions</CollectionsListLabelAligned>
        {collections.map(collection => {
          const { title, collection_id, created_at, tokens_amount, address, thumbnail } = collection
          const dateCreatedFormatted = formatDate(created_at || '')
          const timeCreatedFormatted = formatTime(created_at || '')
          return <>
            <CollectionsListLabelStyled>
              <TokenImageStyled src={thumbnail} address={address} />
              {title}
            </CollectionsListLabelStyled>
            <BatchListValue>
              {dateCreatedFormatted}, <SecondaryTextSpan>{timeCreatedFormatted}</SecondaryTextSpan>
            </BatchListValue>
            <BatchListValue>
              {shortenString(address)}
            </BatchListValue>
            <BatchListValue>
              {defineCollectionStatusTag(tokens_amount)}
            </BatchListValue>
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
