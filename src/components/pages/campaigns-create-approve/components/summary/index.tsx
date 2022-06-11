import { FC } from 'react'
import { RootState } from 'data/store'
import { connect } from 'react-redux'
import { WidgetText, WidgetTextBlock, WidgetData, Loader } from 'components/common'
import {
  WidgetContent,
  WidgetSummary
} from '../../styled-components'
import { useHistory } from 'react-router-dom'
import { WidgetSummaryData, WidgetButton } from './styled-components'
import { IAppDispatch } from 'data/store'
import {
  countAssetsTotalAmountERC20,
  countAssetsTotalAmountERC721,
  countAssetsTotalAmountERC1155,
  defineNativeTokenSymbol
} from 'helpers'
import * as userAsyncActions from 'data/store/reducers/user/async-actions/index'
import { TransactionAside } from 'components/pages/common'
import { TProps, TDefineLinksContent } from './types'

const mapStateToProps = ({
  user: {
    address,
    provider,
    chainId
  },
  campaign: { decimals, symbol, assets, type, loading },
}: RootState) => ({
  loading,
  address,
  provider,
  decimals,
  chainId,
  symbol,
  assets,
  type
})

const mapDispatcherToProps = (dispatch: IAppDispatch) => {
  return {
    approveERC20: (callback: () => void) => {
      dispatch(
        userAsyncActions.approveERC20(callback)
      )
    },
    approveERC721: (callback: () => void) => {
      dispatch(
        userAsyncActions.approveERC721(callback)
      )
    },
    approveERC1155: (callback: () => void) => {
      dispatch(
        userAsyncActions.approveERC1155(callback)
      )
    }
  }
}


const defineLinksContent: TDefineLinksContent = (
  symbol,
  assets,
  chainId,
  type
) => {
  let assetsTotal
  if (type === 'erc20') {
    assetsTotal = countAssetsTotalAmountERC20(assets)
  } else if (type === 'erc721') {
    assetsTotal = countAssetsTotalAmountERC721(assets)
  } else {
    assetsTotal = countAssetsTotalAmountERC1155(assets)
  }
  const nativeTokenSymbol = defineNativeTokenSymbol({ chainId })
  if (String(assetsTotal.native_tokens_amount) === '0') {
    return symbol
  }
  return `${symbol} + ${nativeTokenSymbol}`
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>
const Summary: FC<ReduxType & TProps> = ({
  assets,
  symbol,
  chainId,
  loading,
  approveERC20,
  approveERC721,
  approveERC1155,
  type,
  campaign
}) => {
  const history = useHistory()

  return <WidgetContent>
    {loading && <Loader withOverlay />}
    <WidgetSummary>
      <WidgetTextBlock>
        <WidgetSummaryData>
          <div>
              <WidgetText>
                Links to generate
              </WidgetText>
              <WidgetData>
                {assets?.length}
              </WidgetData>
          </div>
          {type && symbol && assets && chainId && <div>
            <WidgetText>
              Links contents
            </WidgetText>
            <WidgetData>
              {defineLinksContent(symbol, assets, chainId, type)}
            </WidgetData>
          </div>}
        </WidgetSummaryData>
      </WidgetTextBlock>
      
      <WidgetTextBlock>
        <WidgetText>
          Give Linkdrop contracts permission to transfer tokens from your account to receiver
        </WidgetText>
      </WidgetTextBlock>
      <WidgetButton
        title='Approve'
        appearance='action'
        onClick={() => {
          const redirectURL = campaign ? `/campaigns/edit/${type}/${campaign.id}/secure` : `/campaigns/new/${type}/secure`
          const callback = () => {
            history.push(redirectURL)
          }
          if (type === 'erc20') {
            approveERC20(callback)
          } else if (type === 'erc721') {
            approveERC721(callback)
          } else {
            approveERC1155(callback)
          }
        }}
      />
    </WidgetSummary>
    <TransactionAside />
  </WidgetContent>
}

export default connect(mapStateToProps, mapDispatcherToProps)(Summary)