import { FC, useEffect } from 'react'
import {
  WidgetStyled,
  GenerateProgressBar,
  GenerateTitle,
  GenerateSubtitle,
  GenerateImage,
  GenerateContent,
  GenerateWidgetTitle
} from './styled-components'
import { RootState, IAppDispatch } from 'data/store'
import { connect } from 'react-redux'
import * as campaignAsyncActions from 'data/store/reducers/campaign/async-actions'
import { useHistory } from 'react-router-dom'
import { TLaunchStage, TLinkParams } from 'types'
import { useParams } from 'react-router-dom'
import { TCallback } from './types'
import { preventPageClose } from 'helpers'
import GenerateImageSrc from 'images/generate-image.png'

const mapStateToProps = ({
  campaign: {
    tokenStandard,
    links,
    linksGenerateLoader,
    sdk,
    launchStage
  },
}: RootState) => ({
  tokenStandard,
  links,
  linksGenerateLoader,
  sdk,
  launchStage
})

const countProgress = (
  stage: TLaunchStage
) => {
  switch (stage) {
    case 'initial':
      return 0
    case 'secure':
      return 25
    case 'generate_links':
      return 50
    case 'reclaim_webproofs':
      return 75
  }
}

const defineTitle = (
  stage: TLaunchStage
) => {
  switch (stage) {
    case 'secure':
      return 'Deploying smart contract...'
    case 'generate_links':
      return 'Preparing drop...'
    case 'reclaim_webproofs':
      return 'Setting up zkTLS webproofs...'
    default:
      return 'Initializing...'
  }
}

const mapDispatcherToProps = (dispatch: IAppDispatch) => {
  return {
    launch: (callback: TCallback) => dispatch(campaignAsyncActions.launch(callback))
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatcherToProps>

const CampaignsCreateLaunch: FC<ReduxType> = ({
  sdk,
  launch,
  linksGenerateLoader,
  tokenStandard,
  launchStage
}) => {

  const progress = countProgress(launchStage)
  const title = defineTitle(launchStage)
  const history = useHistory()
  const { id } = useParams<TLinkParams>()

  useEffect(() => {
    if (!tokenStandard) { return }
    launch((id) => {
      history.push(`/campaigns/${id}`)
    })
  }, [])

  useEffect(preventPageClose(), [])

  return <WidgetStyled>
    <GenerateImage src={GenerateImageSrc} />
    <GenerateWidgetTitle>Launching</GenerateWidgetTitle>
    <GenerateContent>
      <GenerateProgressBar
        max={100}
        // current={Math.ceil(linksGenerateLoader * 100)}
        current={progress}
      />

      <GenerateTitle>
        {title}
      </GenerateTitle>
      <GenerateSubtitle>
        Don't close this window
      </GenerateSubtitle>
    </GenerateContent>
  </WidgetStyled>
}

export default connect(mapStateToProps, mapDispatcherToProps)(CampaignsCreateLaunch)
