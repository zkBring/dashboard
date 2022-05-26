import { FC, useEffect } from 'react'
import { Container, GenerateProgressBar } from './styled-components'
import { RootState, IAppDispatch } from 'data/store';
import { connect } from 'react-redux'
import * as campaignAsyncActions from 'data/store/reducers/campaign/async-actions'
import { useHistory } from 'react-router-dom'
type TCallback = (id: string) => void

const mapStateToProps = ({
  campaign: { assets, type, links },
}: RootState) => ({
  assets,
  type,
  links
})

const mapDispatcherToProps = (dispatch: IAppDispatch) => {
  return {
    generateERC20: (callback: TCallback) => dispatch(campaignAsyncActions.generateERC20Link({
      callback
    })),
    generateERC721: (callback: TCallback) => dispatch(campaignAsyncActions.generateERC721Link({
      callback
    }))
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatcherToProps>

const CampaignsCreateGenerate: FC<ReduxType> = ({
  generateERC20,
  generateERC721,
  assets,
  links,
  type
}) => {
  const history = useHistory()
  useEffect(() => {
    if (!type) { return }
    if (type === 'erc20') {
      generateERC20((id) => { history.push(`/campaigns/${id}`) })
    } else {
      generateERC721((id) => { history.push(`/campaigns/${id}`) })
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
