import { FC } from 'react'
import {
  Container,
  Header,
  WidgetTitleStyled,
  ContainerButton,
  CollectionsListLabelStyled,
  CollectionsListStyled,
  SecondaryTextSpan,
  TokenImageStyled,
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
  shortenString,
  defineCollectionStatusTag
} from 'helpers'
import { RootState, IAppDispatch } from 'data/store'
import { connect } from 'react-redux'

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
  return {}
}

// ignore to avoid IDE problem, should be solved soon
// @ts-ignore
type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

const Collections: FC<ReduxType> = ({
  collections,
  loading
}) => {

  if (collections.length === 0) {
    return <InitialNote
      title='Create Your First NFT collection'
      text="Your NFT collections will be displayed here once created. You don't have any NFT collections yet"
      href='/collections/ERC1155/initial'
      buttontText='New NFT collection'
    />
  }

  return <Container>
    <WidgetComponent>
      <Header>
        <WidgetTitleStyled>My NFT Contracts</WidgetTitleStyled>
        <ContainerButton
          title='+ Deploy new contract'
          disabled={loading}
          size='extra-small'
          appearance='action'
          to='/collections/new/ERC1155/initial'
        />
      </Header>
      {collections.length > 0 && <CollectionsListStyled>
        <BatchListLabel>Title</BatchListLabel>
        <BatchListLabel>Date created</BatchListLabel>
        <BatchListLabel>Address</BatchListLabel>
        <BatchListLabel>All token copies</BatchListLabel>
        <BatchListLabelTextAlignRight>Actions</BatchListLabelTextAlignRight>
        {collections.map(collection => {
          const { title, collection_id, created_at, tokens_amount, token_address, thumbnail } = collection
          const dateCreatedFormatted = formatDate(created_at || '')
          const timeCreatedFormatted = formatTime(created_at || '')
          return <>
            <CollectionsListLabelStyled>
              <TokenImageStyled src={thumbnail} address={token_address} />
              {title}
            </CollectionsListLabelStyled>
            <BatchListValue>
              {dateCreatedFormatted}, <SecondaryTextSpan>{timeCreatedFormatted}</SecondaryTextSpan>
            </BatchListValue>
            <BatchListValue>
              {shortenString(token_address)}
            </BatchListValue>
            <BatchListValue>
              {defineCollectionStatusTag(tokens_amount || '0')}
            </BatchListValue>
            <BatchListValueJustifySelfEnd>
              <Button
                appearance='additional'
                size='extra-small'
                title='Manage'
                to={`/collections/${collection_id}`}
              />
            </BatchListValueJustifySelfEnd>
          </>
        })}
      </CollectionsListStyled>}
      
    </WidgetComponent>
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(Collections)
