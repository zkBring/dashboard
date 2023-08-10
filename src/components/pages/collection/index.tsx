import { FC, useEffect } from 'react'
import { RootState, IAppDispatch } from 'data/store'
import {
  Container,
  WidgetSubtitle,
  TableRow,
  TableText,
  TableValue,
  ButtonsContainer,
  AttentionContainer
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
  ButtonFullWidth
} from './styled-components'
import { Redirect, useHistory, useParams } from 'react-router-dom'
import { TCollection, TCollectionToken } from 'types'
import { connect } from 'react-redux'
import Icons from 'icons'
import { shortenString, defineExplorerUrl, defineNetworkName } from 'helpers'
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
  tokens?: TCollectionToken[]
) => {
  if (loading) {
    return  <WidgetSubtitle>Loading</WidgetSubtitle>
  }

  if (!tokens || tokens.length === 0) {
    return  <WidgetSubtitle>No tokens in this collection yet :(</WidgetSubtitle>
  }

  return <TokensList>
    {tokens.map(token => <TokenItem><Token {...token} /></TokenItem>)}
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

const Dispenser: FC<ReduxType> = ({
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
    claim_pattern,
    token_address,
    chain_id,
    tokens
  } = collection

  const scannerUrl = defineExplorerUrl(Number(chain_id), `/address/${token_address || ''}`)

  const tokensList = renderTokens(
    loading,
    tokens
  )

  return <Container>
    <MainContent>
      <WidgetComponentStyled title='Tokens'>
        {tokensList}
        <ButtonsContainer>
          <ButtonStyled
            loading={loading}
            to={`/collections/${collection_id}/token/new`}
            appearance='action'
          >
            Add token
          </ButtonStyled>
        </ButtonsContainer>
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
            <TableText>Claim Pattern Support</TableText>
            <TableValue>{claim_pattern}</TableValue>
          </TableRow>

          <TableRow>
            <TableText>Address</TableText>
            <TableValueFlex>
              {scannerUrl ? <>
                <Icons.MiniClipboardCopyIcon />
                <TextLink
                  href={scannerUrl}
                >
                  {shortenString(token_address)}
                </TextLink>
              </> : shortenString(token_address)}
            </TableValueFlex>
          </TableRow>
        </AsideContent>
      </AsideStyled>

      <WidgetAsideStyled title='Whats next?'>
        <WidgetSubtitle>
          You got your first token minted, go ahead and create your first set of Linkdrop Claim Links, using this NFT contract
        </WidgetSubtitle>
        <ButtonFullWidth
          to={`/campaigns/new`}
          appearance='action'
        >
            Create Claim Links 
          </ButtonFullWidth>
      </WidgetAsideStyled>

      <AttentionContainer
        title='Appearance on marketplaces'
        text='Your collection can look different on marketplaces like Rarible and Opensea. Read our small guide on how to set up you collection appearance on marketplaces.'
        actions={[
          {
            title: 'Read guide',
            onClick: () => {
              plausibleApi.invokeEvent({
                eventName: 'start_guide',
                data: {
                  network: defineNetworkName(chainId),
                  component: 'aside'
                }
              })
              window.open('https://docs.linkdrop.io/how-tos/main-guide/', '_blank')
            }
          }
        ]}
      />
    </div>
    
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(Dispenser)