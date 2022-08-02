import { FC, useEffect } from 'react'
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
  campaign: { decimals, symbol, assets, tokenStandard, loading, claimPattern },
}: RootState) => ({
  loading,
  address,
  provider,
  decimals,
  chainId,
  symbol,
  assets,
  tokenStandard,
  claimPattern
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
    },
    grantRole: (callback: () => void) => {
      dispatch(
        userAsyncActions.grantRole(callback)
      )
    },
    checkIfApproved: (
      callback: () => void,
    ) => {
      dispatch(
        userAsyncActions.checkIfApproved(callback)
      )
    },
    checkIfGranted: (
      callback: () => void,
    ) => {
      dispatch(
        userAsyncActions.checkIfGranted(callback)
      )
    },

  }
}


const defineLinksContent: TDefineLinksContent = (
  symbol,
  assets,
  chainId,
  type
) => {
  let assetsTotal
  if (type === 'ERC20') {
    assetsTotal = countAssetsTotalAmountERC20(assets)
  } else if (type === 'ERC721') {
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
  tokenStandard,
  campaign,
  checkIfApproved,
  checkIfGranted,
  claimPattern,
  grantRole
}) => {
  const history = useHistory()
  const redirectURL = campaign ? `/campaigns/edit/${tokenStandard}/${campaign.campaign_id}/secure` : `/campaigns/new/${tokenStandard}/secure`

  useEffect(() => {
    if (!campaign) {
      return
    }
    if (campaign && campaign.claim_pattern === 'mint') {
      return checkIfGranted(() => history.push(redirectURL))
    }
    if (tokenStandard === 'ERC20') { return } // always show when transfer
    checkIfApproved(() => history.push(redirectURL))
  }, [])

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
          {tokenStandard && symbol && assets && chainId && <div>
            <WidgetText>
              Links contents
            </WidgetText>
            <WidgetData>
              {defineLinksContent(symbol, assets, chainId, tokenStandard)}
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
          
          const callback = () => {
            history.push(redirectURL)
          }
          if (claimPattern === 'mint') {
            return grantRole(callback)
          }
          if (tokenStandard === 'ERC20') {
            approveERC20(callback)
          } else if (tokenStandard === 'ERC721') {
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