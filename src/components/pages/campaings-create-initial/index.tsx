import { FC, useEffect } from 'react'
import { Container } from './styled-components'
import { Erc20 } from './components'
import { RootState, IAppDispatch } from 'data/store';
import { connect } from 'react-redux'
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
  return <Container>
    <Erc20 type='erc20' />
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(CampaignsCreateInitial)
