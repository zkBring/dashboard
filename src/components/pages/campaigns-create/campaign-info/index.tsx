import { FC, useEffect, useState } from 'react'
import {
  WidgetInput,
  WidgetControls,
  WidgetButton,
  DoubleWidget,
} from '../styled-components'
import { RootState } from 'data/store';
import {
  Widget,
  PreviewWidget,
  Textarea
} from 'components/common'
import * as newRetroDropAsyncActions from 'data/store/reducers/campaign/async-actions'
import { Dispatch } from 'redux';
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

type TProps = {
  cancel: () => void
}

const mapStateToProps = ({
  user: { address, provider, chainId },
  campaign: { loading, tokenAddress, type, title, description, logoURL },
}: RootState) => ({
  loading,
  address,
  provider,
  tokenAddress,
  chainId,
  type,
  title, description, logoURL
})
const mapDispatcherToProps = (dispatch: Dispatch) => {
  return {
    
  }
}
type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps> & TProps


const CampaignInfo: FC<ReduxType> = ({
  loading,
  cancel,
  tokenAddress,
  chainId,
  type,
  title, description, logoURL
}) => {
  const history = useHistory()
  const [ dropTitle, setDropTitle ] = useState(title || '')
  const [ dropLogoURL, setDropLogoURL ] = useState(logoURL || '')
  const [ dropDescription, setDropDescription ] = useState(description || '')

  return <DoubleWidget>
    <Widget>
      <WidgetInput
        title='Drop’s title'
        onChange={value => { setDropTitle(value); return value}}
        value={dropTitle}
      />
      <WidgetInput
        title='Logo URL'
        onChange={value => { setDropLogoURL(value); return value}}
        value={dropLogoURL}
        placeholder='https://'
      />
      <Textarea
        title='Description'
        onChange={value => { setDropDescription(value); return value}}
        value={dropDescription}
        limit={120}
        placeholder='Enter description here'
      />
      <WidgetControls>
        <WidgetButton
          title='Start over'
          appearance='default'
          onClick={cancel}
        />
        <WidgetButton
          title={loading ? 'Processing' : 'Continue'}
          loading={loading}
          appearance='default'
          disabled={!dropTitle || !tokenAddress || loading}
          onClick={() => {
            if (!tokenAddress || !chainId || !type) { return }
          }}
        />
      </WidgetControls>
    </Widget>
    <PreviewWidget
      title={dropTitle}
      description={dropDescription}
      image={dropLogoURL}
    />
  </DoubleWidget>
}

export default connect(mapStateToProps, mapDispatcherToProps)(CampaignInfo)

