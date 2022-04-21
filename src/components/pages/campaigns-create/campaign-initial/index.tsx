import { FC, useState, useEffect } from 'react'
import {
  Widget
} from 'components/common'
import {
  WidgetInput,
  WidgetControls,
  WidgetButton
} from '../styled-components'
import { Dispatch } from 'redux';
import { connect } from 'react-redux'
import { RootState } from 'data/store';
import * as newRetroDropAsyncActions from 'data/store/reducers/campaign/async-actions'
import { useHistory } from 'react-router-dom'

type TProps = {
  cancel: () => void
}

const mapStateToProps = ({
  campaign: { type, tokenAddress },
  user: { provider }
}: RootState) => ({
  type,
  provider,
  tokenAddress
})

const mapDispatcherToProps = (dispatch: Dispatch) => {
  return {}
}
type ReduxType = ReturnType<typeof mapDispatcherToProps> & TProps & ReturnType<typeof mapStateToProps>

const CampaignInfo: FC<ReduxType> = ({
  cancel,
  type,
  provider,
  tokenAddress
}) => {
  const [ currentTokenAddress, setCurrentTokenAddress ] = useState(tokenAddress || '')
  const history = useHistory()

  return <Widget>
    <WidgetInput
      title='Contract address'
      onChange={value => { setCurrentTokenAddress(value); return value}}
      value={currentTokenAddress}
      placeholder='Enter contract address'
    />
    <WidgetControls>
      <WidgetButton
        title='Cancel'
        appearance='default'
        onClick={cancel}
      />
      <WidgetButton
        title='Continue'
        appearance='default'
        disabled={currentTokenAddress.length !== 42}
        onClick={() => {
          if (!type) { return }
        }}
      />
    </WidgetControls>
  </Widget>
}

export default connect(mapStateToProps, mapDispatcherToProps)(CampaignInfo)