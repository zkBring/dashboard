import { FC, useState, useMemo, useEffect } from 'react'
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
  TokenItem
} from './styled-components'
import { Redirect, useHistory, useParams } from 'react-router-dom'
import { TCollection, TCollectionToken } from 'types'
import { connect } from 'react-redux'
import Icons from 'icons'
import { shortenString, defineExplorerUrl } from 'helpers'
import { TextLink } from 'components/common'
import { Token } from './components'

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

const renderTokens = (tokens?: TCollectionToken[]) => {
  if (!tokens || tokens.length === 0) {
    return  <WidgetSubtitle>No tokens in this collection yet :(</WidgetSubtitle>
  }

  return <TokensList>
    {tokens.map(token => <TokenItem><Token {...token} /></TokenItem>)}
  </TokensList>
}

const mapDispatcherToProps = (dispatch: IAppDispatch) => {
  return {
    
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

const Dispenser: FC<ReduxType> = ({
  collections,
  loading,
  dashboardKey,
  chainId
}) => {
  const { collection_id } = useParams<{collection_id: string}>()
  const collection: TCollection | undefined = collections.find(collection => String(collection.collection_id) === collection_id)
  const history = useHistory()


  useEffect(() => {
    // if (!dispenser) { return }
    // getDispenserStats(
    //   dispenser.dispenser_id as string,
    //   () => setStatsLoading(false)
    // )
  }, [])
  if (!collection || !dashboardKey) {
    return <Redirect to='/collections' />
  }

  const {
    symbol,
    token_type,
    claim_pattern,
    address,
    chain_id,
    tokens
  } = collection
  const scannerUrl = defineExplorerUrl(chain_id, `/address/${address || ''}`)

  const tokensList = renderTokens(tokens)

  return <Container>
    <MainContent>
      <WidgetComponentStyled title='Tokens'>
        {tokensList}
        <ButtonsContainer>
          <ButtonStyled
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
            <TableValue>{token_type}</TableValue>
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
                  {shortenString(address)}
                </TextLink>
              </> : shortenString(address)}
            </TableValueFlex>
          </TableRow>
        </AsideContent>
      </AsideStyled>
    </div>
    
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(Dispenser)