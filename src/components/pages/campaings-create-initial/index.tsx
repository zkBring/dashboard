import React, { FC, useEffect } from 'react'
import { Container, WidgetComponent } from './styled-components'
import { Erc20, Erc721, Erc1155 } from './components'
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

type TDefineComponent = (type: TTokenType) => React.ReactNode

const defineComponent: TDefineComponent = (type) => {
  if (type === 'erc20') {
    return <Erc20 type='erc20' />
  } else if (type === 'erc721') {
    return <Erc721 type='erc721' />
  } else {
    return <Erc1155 type='erc1155' />
  }
}

const CampaignsCreateInitial: FC<ReduxType> = ({
  createProxyContract
}) => {

  useEffect(() => {
    createProxyContract()
  }, [])
  const { type } = useParams<{type: TTokenType}>()
  const content = defineComponent(type)
  return <Container>
    <WidgetComponent title='Setup'>
      {content}
    </WidgetComponent>
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(CampaignsCreateInitial)
