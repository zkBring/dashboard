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
import { TAsset, TTokenType } from 'types'
import { IAppDispatch } from 'data/store'
import { countAssetsTotalAmountERC20, countAssetsTotalAmountERC721, defineNativeTokenSymbol } from 'helpers'
import * as userAsyncActions from 'data/store/reducers/user/async-actions/index'
import { TransactionAside } from 'components/pages/common'

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
    }
  }
}

type TDefineLinksContent = (
  symbol: string,
  assets: TAsset[],
  chainId: number,
  type: TTokenType
) => string
const defineLinksContent: TDefineLinksContent = (
  symbol,
  assets,
  chainId,
  type
) => {
  let assetsTotal
  if (type === 'erc20') {
    assetsTotal = countAssetsTotalAmountERC20(assets)
  } else {
    assetsTotal = countAssetsTotalAmountERC721(assets)
  }
  const nativeTokenSymbol = defineNativeTokenSymbol({ chainId })
  if (String(assetsTotal.nativeTokensAmount) === '0') {
    return symbol
  }
  return `${symbol} + ${nativeTokenSymbol}`
  
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>
const Summary: FC<ReduxType> = ({
  assets,
  symbol,
  chainId,
  loading,
  approveERC20,
  approveERC721,
  type
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
          const redirectURL = `/campaigns/new/${type}/secure`
          if (type === 'erc20') {
            approveERC20(
              () => {
                history.push(redirectURL)
              }
            )
          } else {
            approveERC721(
              () => {
                history.push(redirectURL)
              }
            )
          }
          
        }}
      />
    </WidgetSummary>
    <TransactionAside />
  </WidgetContent>
}

export default connect(mapStateToProps, mapDispatcherToProps)(Summary)