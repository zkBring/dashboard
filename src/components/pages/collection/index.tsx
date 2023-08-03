import { FC, useState, useMemo, useEffect } from 'react'
import { RootState, IAppDispatch } from 'data/store'
import {
  Container,
  WidgetSubtitle,
  TableRow,
  TableText,
  TableValue
} from 'components/pages/common'
import {
  AsideContent,
  SecondaryTextSpan,
  AsideStyled,
  MainContent,
  TableValueFlex
} from './styled-components'
import {
  defineDispenserStatusTag,
} from 'helpers'
import { Redirect, useHistory, useParams } from 'react-router-dom'
import { TCollection } from 'types'
import { connect } from 'react-redux'
import * as asyncDispensersActions from 'data/store/reducers/dispensers/async-actions'
import { decrypt, encrypt } from 'lib/crypto'
import Icons from 'icons'
import moment from 'moment'
import { ethers } from 'ethers'
import { shortenString, defineExplorerUrl } from 'helpers'
import { TextLink } from 'components/common'

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
    chain_id
  } = collection
  const scannerUrl = defineExplorerUrl(chain_id, `/address/${address || ''}`)

  return <Container>
    <MainContent>
      
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
              <Icons.MiniClipboardCopyIcon />
              <TextLink
                href={scannerUrl}
              >
                {shortenString(address)}
              </TextLink>
            </TableValueFlex>
          </TableRow>
        </AsideContent>
      </AsideStyled>
    </div>
    
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(Dispenser)