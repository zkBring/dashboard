import { FC, useState } from 'react'
import {
  Container,
  Header,
  WidgetTitleStyled,
  ContainerButton,
  CollectionsListLabelStyled,
  CollectionsListStyled,
  SecondaryTextSpan,
  IconWrapper,
  ButtonStyled,
  BatchListLabelTextAlignRight,
  BatchListValueJustifySelfEnd
} from './styled-components'
import {
  TCollectionType
} from './types'
import {
  Tabs
} from './components'
import {
  Loader
} from 'components/common'
import {
  BatchListLabel,
  BatchListValue,
  WidgetComponent,
  InitialNote
} from 'components/pages/common'
import {
  formatDate,
  formatTime,
  defineCollectionStatusTag,
  defineCollectionStatus
} from 'helpers'
import { RootState, IAppDispatch } from 'data/store'
import { connect } from 'react-redux'
import Icons from 'icons'
import * as collectionsAsyncActions from 'data/store/reducers/collections/async-actions'

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
    archiveItem: (
      id: string
    ) => {
      dispatch(
        collectionsAsyncActions.updateArchived(
          id,
          true
        )
      )
    },
    unarchiveItem: (
      id: string
    ) => {
      dispatch(
        collectionsAsyncActions.updateArchived(
          id,
          false
        )
      )
    }
  }
}

const defineButtons = (
  archived: boolean,
  collection_id: string,
  archiveItem: (campaign_id: string) => void,
  unarchiveItem: (campaign_id: string) => void
) => {
  if (!archived) {
    return <>
      <ButtonStyled
        appearance='additional'
        size='extra-small'
        onClick={() => archiveItem(collection_id)}
      >
        <Icons.ArchiveIcon />
      </ButtonStyled>
      <ButtonStyled
        appearance='additional'
        size='extra-small'
        to={`/collections/${collection_id}`}
      >
        Manage
      </ButtonStyled>
    </>
  }

  return <ButtonStyled
    appearance='additional'
    size='extra-small'
    onClick={() => unarchiveItem(collection_id)}
  >
    <IconWrapper>
      <Icons.UndoIcon />
    </IconWrapper>
    Unarchive
  </ButtonStyled>
}

// ignore to avoid IDE problem, should be solved soon
// @ts-ignore
type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

const Collections: FC<ReduxType> = ({
  collections,
  loading,
  archiveItem,
  unarchiveItem
}) => {

  const [
    collectionType,
    setCollectionType
  ] = useState<TCollectionType>('ACTIVE')

  if (loading && collections.length === 0) {
    return <Loader size='large' />
  }

  if (collections.length === 0) {
    return <InitialNote
      title='Create your first Soulbound'
      text="Your Soulbound collection will be displayed here once created"
      href='/collections/new/ERC1155/initial'
      buttontText='New NFT collection'
    />
  }

  // @ts-ignore
  const collectionsToShow = collections.filter(collection => {
    if (collectionType === 'ACTIVE') {
      if (!collection.archived) {
        return true
      }
      return false
    }

    return collection.archived
  })

  return <Container>
    <WidgetComponent>
      <Header>
        <WidgetTitleStyled>My Soulbounds</WidgetTitleStyled>
        <ContainerButton
          title='+ Add'
          disabled={loading}
          size='extra-small'
          loading={loading}
          appearance='action'
          to='/collections/new/ERC1155/initial'
        />
      </Header>
      <Tabs
        activeTab={collectionType}
        setCollectionType={setCollectionType}
      />
      {collectionsToShow.length > 0 && <CollectionsListStyled>
        <BatchListLabel>Created</BatchListLabel>
        <BatchListLabel>Name</BatchListLabel>
        <BatchListLabel>Symbol</BatchListLabel>
        <BatchListLabel>Links</BatchListLabel>
        <BatchListLabel>Claims</BatchListLabel>
        <BatchListLabel>Status</BatchListLabel>
        <BatchListLabelTextAlignRight>Actions</BatchListLabelTextAlignRight>

        {/* @ts-ignore */}
        {collectionsToShow.map(collection => {
          const {
            title,
            collection_id,
            created_at,
            tokens_amount,
            token_address,
            symbol,
            links_claimed,
            links_count,
            archived
          } = collection
          const status = defineCollectionStatus(
            false,
            Number(links_count),
            Number(tokens_amount),
            archived
          )
          const statusTag = defineCollectionStatusTag(
            status
          )
          const dateCreatedFormatted = formatDate(created_at || '')
          const timeCreatedFormatted = formatTime(created_at || '')
          return <>
            <BatchListValue>
              {dateCreatedFormatted}, <SecondaryTextSpan>{timeCreatedFormatted}</SecondaryTextSpan>
            </BatchListValue>
            <CollectionsListLabelStyled>
              {title}
            </CollectionsListLabelStyled>

            <BatchListValue>
              {symbol}
            </BatchListValue>
            <BatchListValue>
              {links_count}
            </BatchListValue>
            <BatchListValue>
              {links_claimed}
            </BatchListValue>
            <BatchListValue>
              {statusTag}
            </BatchListValue>
            <BatchListValueJustifySelfEnd>
              {
                defineButtons(
                  Boolean(archived),
                  collection_id as string,
                  archiveItem,
                  unarchiveItem
                )
              }
            </BatchListValueJustifySelfEnd>
          </>
        })}
      </CollectionsListStyled>}
      
    </WidgetComponent>
  </Container>
}

// @ts-ignore
export default connect(mapStateToProps, mapDispatcherToProps)(Collections)
