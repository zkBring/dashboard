import { FC, useEffect } from 'react'
import { Container, WidgetComponent } from './styled-components'
import { Erc20, Erc721 } from './components'
import { RootState, IAppDispatch } from 'data/store';
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { TTokenType } from 'types'
import * as campaignAsyncActions from 'data/store/reducers/campaign/async-actions'

const mapStateToProps = ({
  campaign: {
    type
  },
}: RootState) => ({
  type
})


const mapDispatcherToProps = (dispatch: IAppDispatch) => {
  return {
    createProxyContract: () => dispatch(campaignAsyncActions.createProxyContract()),
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatcherToProps>

const CampaignsCreateInitial: FC<ReduxType> = ({
  createProxyContract
}) => {

  useEffect(() => {
    createProxyContract()
  }, [])
  const { type } = useParams<{type: TTokenType}>()
  return <Container>
    <WidgetComponent title='Setup'>
      {type === 'erc20' ? <Erc20 type='erc20' /> : <Erc721 type='erc721' />}
      
    </WidgetComponent>
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(CampaignsCreateInitial)
