import { FC, useEffect } from 'react'
import { Container, GenerateProgressBar } from './styled-components'
import { RootState, IAppDispatch } from 'data/store';
import { connect } from 'react-redux'
import * as campaignAsyncActions from 'data/store/reducers/campaign/async-actions'
import { useHistory } from 'react-router-dom'
import { TLinkParams } from 'types'
import { useParams } from 'react-router-dom'
import { TCallback } from './types'

const mapStateToProps = ({
  campaign: { assets, type, links },
}: RootState) => ({
  assets,
  type,
  links
})

const mapDispatcherToProps = (dispatch: IAppDispatch) => {
  return {
    generateERC20: (callback: TCallback, id?: string, ) => dispatch(campaignAsyncActions.generateERC20Link({
      callback,
      id
    })),
    generateERC721: (callback: TCallback, id?: string) => dispatch(campaignAsyncActions.generateERC721Link({
      callback,
      id
    })),
    generateERC1155: (callback: TCallback, id?: string) => dispatch(campaignAsyncActions.generateERC1155Link({
      callback,
      id
    }))
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatcherToProps>

const CampaignsCreateGenerate: FC<ReduxType> = ({
  generateERC20,
  generateERC721,
  generateERC1155,
  assets,
  links,
  type
}) => {
  const history = useHistory()
  const { id } = useParams<TLinkParams>()

  useEffect(() => {
    if (!type) { return }
    
    if (type === 'erc20') {
      generateERC20((id) => {
        history.push(`/campaigns/${id}`)
      }, id)
    } else if (type === 'erc721') {
      generateERC721((id) => {
        history.push(`/campaigns/${id}`)
      }, id)
    } else {
      generateERC1155((id) => {
        history.push(`/campaigns/${id}`)
      }, id)
    }
  }, [])

  return <Container>
    <GenerateProgressBar
      max={(assets || []).length}
      current={(links || []).length}
    />
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(CampaignsCreateGenerate)
