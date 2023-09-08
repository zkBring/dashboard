import { FC, useEffect, useState } from 'react'
import { RootState, IAppDispatch } from 'data/store'
import {
  Container,
  WidgetSubtitle,
  TableRow,
  TableText,
  TableValue,
  ButtonsContainer
} from 'components/pages/common'
import {
  AsideContent,
  AsideStyled,
  MainContent,
  TableValueFlex,
  WidgetComponentStyled,
  ButtonStyled,
  TokensList,
  TokenItem,
  WidgetAsideStyled,
  ButtonFullWidth,
  CopyIcon,
  Header,
  WidgetTitleStyled,
  ContainerButton,
  AttentionContainerStyled
} from './styled-components'
import { Redirect, useHistory, useParams } from 'react-router-dom'
import { TCollection, TCollectionToken } from 'types'
import { connect } from 'react-redux'
import Icons from 'icons'
import { shortenString, defineExplorerUrl, defineNetworkName, copyToClipboard } from 'helpers'
import { TextLink } from 'components/common'
import { Token } from './components'
import { plausibleApi } from 'data/api'
import * as asyncCollectionsActions from 'data/store/reducers/collections/async-actions'

const mapStateToProps = ({
  collections: { collections, loading },
  user: { address, chainId, dashboardKey },
}: RootState) => ({
  address,
  chainId,
  collections,
  loading,
  dashboardKey
})

const renderTokens = (
  loading: boolean,
  collection_id: string,
  tokens?: TCollectionToken[]
) => {
  if (loading) {
    return  <WidgetSubtitle>Loading</WidgetSubtitle>
  }

  if (!tokens || tokens.length === 0) {
    return  <WidgetSubtitle>No tokens in this collection yet :(</WidgetSubtitle>
  }

  return <TokensList>
    {tokens.map(token => <TokenItem>
      <Token
        collectionId={collection_id}
        {...token}
      />
    </TokenItem>)}
  </TokensList>
}

const mapDispatcherToProps = (dispatch: IAppDispatch) => {
  return {
    getCollectionData: (
      collection_id: string
    ) => {
      return dispatch(asyncCollectionsActions.getCollectionData(collection_id))
    }
  }
}

// @ts-ignore
type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

const Collection: FC<ReduxType> = ({
  collections,
  loading,
  dashboardKey,
  chainId,
  getCollectionData
}) => {
  const { collection_id } = useParams<{collection_id: string}>()
  const collection: TCollection | undefined = collections.find(collection => String(collection.collection_id) === collection_id)
  const history = useHistory()

  useEffect(() => {
    if (collection_id) {
      getCollectionData(collection_id)
    }
  }, [])

  if (!collection || !dashboardKey) {
    return <Redirect to='/collections' />
  }

  const {
    symbol,
    token_standard,
    token_address,
    chain_id,
    tokens
  } = collection

  const scannerUrl = defineExplorerUrl(Number(chain_id), `/address/${token_address || ''}`)

  const tokensList = renderTokens(
    loading,
    collection_id,
    tokens
  )

  return <Container>
    <MainContent>
      <WidgetComponentStyled>
        <Header>
          <WidgetTitleStyled>My NFTs</WidgetTitleStyled>
          {tokens && tokens.length > 0 && <ContainerButton
            title='+ Add token'
            disabled={loading}
            size='extra-small'
            to={`/collections/${collection_id}/token/new`}
            appearance='action'
          />}
        </Header>
        {tokensList}
        {!tokens || tokens.length === 0 && <ButtonsContainer>
          <ButtonStyled
            loading={loading}
            to={`/collections/${collection_id}/token/new`}
            appearance='action'
          >
            Add token
          </ButtonStyled>
        </ButtonsContainer>}
      </WidgetComponentStyled>
      
    </MainContent>

    <div>
      <AsideStyled
        title="Summary"
      >
        <WidgetSubtitle>
          Here are your collection details details 
        </WidgetSubtitle>
        <AsideContent>
          <TableRow>
            <TableText>Collection symbol</TableText>
            <TableValue>{symbol}</TableValue>
          </TableRow>

          <TableRow>
            <TableText>Token type</TableText>
            <TableValue>{token_standard}</TableValue>
          </TableRow>

          <TableRow>
            <TableText>Address</TableText>
            <TableValueFlex>
              <CopyIcon
                onClick={() => {
                  copyToClipboard({ value: token_address as string })
                }}
              >
                <Icons.MiniClipboardCopyIcon />
              </CopyIcon>
              {scannerUrl ? <>                
                <TextLink
                  href={scannerUrl}
                  target="_blank"
                >
                  {shortenString(token_address)}
                </TextLink>
              </> : shortenString(token_address)}
            </TableValueFlex>
          </TableRow>
        </AsideContent>
      </AsideStyled>

      <AttentionContainerStyled
        title='Claim Links'
        text='Claim Links are web links that allow anyone who follow them mint a token'
      />

      <WidgetAsideStyled title='Make Non-Transferable (SBT)'>
        <WidgetSubtitle>
          Contact us for instructions on how to make you tokens non-transferable (turning them to Soulbound Tokens) 
        </WidgetSubtitle>
        <ButtonFullWidth
          onClick={() => {
            plausibleApi.invokeEvent({
              eventName: 'contact',
              data: {
                network: defineNetworkName(chainId),
                component: 'collection'
              }
            })
            window.open('https://linkdrop.io/contact-us', '_blank')
          }}
        >
          Contact Us
        </ButtonFullWidth>
      </WidgetAsideStyled>
            
    </div>
    
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(Collection)