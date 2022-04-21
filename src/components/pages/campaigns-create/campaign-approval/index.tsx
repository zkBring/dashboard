import { FC, useEffect } from 'react'
import {
  WidgetControls,
  WidgetButton,
  WidgetDataSplit,
  WidgetDataBlock
} from '../styled-components'
import { RootState } from 'data/store';
import {
  Widget,
  DataBlock
} from 'components/common'
import { defineNetworkName, capitalize } from 'helpers'
import { useHistory } from 'react-router-dom'
import { TTokenType } from 'types'

import {
  approveERC1155,
  approveERC721,
  approveERC20
} from 'data/store/reducers/contract/async-actions'
import { Dispatch } from 'redux';
import { connect } from 'react-redux'
import { ContractActions } from 'data/store/reducers/contract/types'

type TProps = {
  cancel: () => void
}

const mapStateToProps = ({
  user: { address, provider, chainId },
  campaign: { loading, tokenAddress, type, decimals, title, description, logoURL },
  contract: { loading: contractLoading },
}: RootState) => ({
  loading,
  address,
  provider,
  decimals,
  tokenAddress,
  chainId,
  contractLoading,
  type,
  title, description, logoURL
})
const mapDispatcherToProps = (dispatch: Dispatch<ContractActions>) => {
  return {}
}
type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps> & TProps

const CampaignApproval: FC<ReduxType> = ({
  cancel,
  chainId,
  contractLoading,
  tokenAddress,
  provider,
  type,
  address,
  title, description, logoURL,
  decimals
}) => {
  const history = useHistory()
  return <Widget>
    <DataBlock
      title='Drop’s title'
      text={title}
    />
    <WidgetDataSplit>
      <WidgetDataBlock
        title='Network'
        text={capitalize(defineNetworkName(chainId))}
      />
      <WidgetDataBlock
        title='Type of token'
        text={(type || '').toUpperCase()}
      />
    </WidgetDataSplit>
    <DataBlock
      title='Token Address'
      text={tokenAddress || ''}
    />
    <DataBlock
      title='Drop contract'
      text={''}
    />
    <WidgetDataSplit>
      
    </WidgetDataSplit>
    <WidgetControls>
      <WidgetButton
        title='Start over'
        appearance='default'
        onClick={cancel}
      />
      <WidgetButton
        title={contractLoading ? 'Approving' : 'Give approval'}
        disabled={!tokenAddress || contractLoading}
        loading={contractLoading}
        appearance='default'
        onClick={() => {
          if (!tokenAddress || !chainId || !type || !title) { return }
          let method
          if (type === 'erc1155') { method = approveERC1155 }
          else if (type === 'erc721') { method = approveERC721 }
        }}
      />
    </WidgetControls>
  </Widget>
}

export default connect(mapStateToProps, mapDispatcherToProps)(CampaignApproval)
