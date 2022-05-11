import { FC, useEffect } from 'react'
import { ProgressBar } from 'components/common'
import { Container } from './styled-components'
import { RootState, IAppDispatch } from 'data/store';
import { connect } from 'react-redux'
import * as campaignAsyncActions from 'data/store/reducers/campaign/async-actions'

const mapStateToProps = ({
  campaign: { assets, type, links },
}: RootState) => ({
  assets,
  type,
  links
})

const mapDispatcherToProps = (dispatch: IAppDispatch) => {
  return {
    generate: () => dispatch(campaignAsyncActions.generateERC20Link()),
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatcherToProps>

const CampaignsCreateGenerate: FC<ReduxType> = ({
  generate,
  assets,
  links
}) => {
  useEffect(() => {
    generate()
  }, [])
  console.log({ links1: links })
  return <Container>
    <ProgressBar
      max={(assets || []).length}
      current={(links || []).length}
    />
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(CampaignsCreateGenerate)
