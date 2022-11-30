import { FC, useEffect } from 'react'
import {
  Container,
  GenerateProgressBar,
  GenerateTitle,
  GenerateSubtitle,
  GenerateProgress
} from './styled-components'
import { RootState, IAppDispatch } from 'data/store';
import { connect } from 'react-redux'
import * as campaignAsyncActions from 'data/store/reducers/campaign/async-actions'
import { useHistory } from 'react-router-dom'
import { TLinkParams } from 'types'
import { useParams } from 'react-router-dom'
import { TCallback } from './types'

const mapStateToProps = ({
  campaign: {
    assets,
    tokenStandard,
    links,
    linksGenerateLoader
  },
}: RootState) => ({
  assets,
  tokenStandard,
  links,
  linksGenerateLoader
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
  linksGenerateLoader,
  tokenStandard
}) => {
  const history = useHistory()
  const { id } = useParams<TLinkParams>()

  useEffect(() => {
    console.log({ tokenStandard })
    if (!tokenStandard) { return }
    
    if (tokenStandard === 'ERC20') {
      generateERC20((id) => {
        history.push(`/campaigns/${id}`)
      }, id)
    } else if (tokenStandard === 'ERC721') {
      generateERC721((id) => {
        history.push(`/campaigns/${id}`)
      }, id)
    } else {
      generateERC1155((id) => {
        console.log('here')
        history.push(`/campaigns/${id}`)
      }, id)
    }
  }, [])

  return <Container>

    <GenerateProgress>
      {Math.ceil(linksGenerateLoader * 100)}%
    </GenerateProgress>

    <GenerateTitle>
      Links generating
    </GenerateTitle>
    <GenerateSubtitle>
      Don’t close this window until all links are successfully created
    </GenerateSubtitle>
    
    <GenerateProgressBar
      max={100}
      current={Math.ceil(linksGenerateLoader * 100)}
    />
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(CampaignsCreateGenerate)
