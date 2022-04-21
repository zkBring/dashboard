import { FC, useEffect } from 'react'
import {
  WidgetControls,
  WidgetButton,
  WidgetDataSplit,
  WidgetDataBlock,
  DoubleWidget
} from '../styled-components'
import { RootState } from 'data/store';
import {
  Widget,
  DataBlock,
  PreviewWidget
} from 'components/common'
import { defineNetworkName, capitalize, defineEtherscanUrl } from 'helpers'
import { Dispatch } from 'redux';
import { connect } from 'react-redux'
import { ContractActions } from 'data/store/reducers/contract/types'
import {
  createDrop
} from 'data/store/reducers/contract/async-actions'
import { useHistory } from 'react-router-dom'

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
  tokenAddress,
  decimals,
  chainId,
  contractLoading,
  type,
  title, description, logoURL
})
const mapDispatcherToProps = (dispatch: Dispatch<ContractActions>) => {
  return {
  }
}
type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps> & TProps


const CampaignDeploy: FC<ReduxType> = ({
  title, description, logoURL,
  cancel,
  chainId,
  contractLoading,
  tokenAddress,
  provider,
  type,
  decimals,
}) => {
  const history = useHistory()

  return <DoubleWidget>
    <Widget>
      <DataBlock
        title='Drop’s title'
        text={title}
      />
      <WidgetDataSplit>
        <WidgetDataBlock
          title='Network'
          text={capitalize(defineNetworkName(chainId))}
        />
        {type && <WidgetDataBlock
          title='Type of token'
          text={type.toUpperCase()}
        />}
      </WidgetDataSplit>
      {tokenAddress && <DataBlock
        title='Token Address'
        link={defineEtherscanUrl(chainId, tokenAddress)}
        text={tokenAddress}
      />}
      
      <WidgetControls>
        <WidgetButton
          title='Start over'
          appearance='default'
          onClick={cancel}
        />
        <WidgetButton
          title={contractLoading ? 'Deploying' : 'Deploy'}
          appearance='default'
          disabled={Boolean(!tokenAddress || contractLoading)}
          loading={contractLoading}
          onClick={() => {
            
          }}
        />
      </WidgetControls>
    </Widget>
    <PreviewWidget
      title={title || ''}
      description={description || ''}
      image={logoURL || ''}
    />
  </DoubleWidget>
}

export default connect(mapStateToProps, mapDispatcherToProps)(CampaignDeploy)

