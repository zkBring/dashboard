import { FC } from 'react'
import {
  Container,
  GenerateProgressBar,
  GenerateTitle,
  GenerateSubtitle,
  GenerateProgress
} from './styled-components'
import { RootState } from 'data/store'
import { connect } from 'react-redux'

const mapStateToProps = ({
  dispensers: {
    mappingLoader
  }
}: RootState) => ({
  mappingLoader
})

type ReduxType = ReturnType<typeof mapStateToProps>

const CampaignDispenserGenerate: FC<ReduxType> = ({
  mappingLoader
}) => {
  return <Container>
    <GenerateProgress>
      {Math.ceil(mappingLoader * 100)}%
    </GenerateProgress>

    <GenerateTitle>
      Links mapping
    </GenerateTitle>
    <GenerateSubtitle>
      Don’t close this window until dispenser is successfully created
    </GenerateSubtitle>
    
    <GenerateProgressBar
      max={100}
      current={Math.ceil(mappingLoader * 100)}
    />
  </Container>
}

export default connect(mapStateToProps)(CampaignDispenserGenerate)
