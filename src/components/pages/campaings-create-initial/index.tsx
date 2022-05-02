import { FC } from 'react'
import { Container } from './styled-components'
import { Erc20 } from './components'
import { RootState } from 'data/store';
import { connect } from 'react-redux'

const mapStateToProps = ({
  campaign: {
    type
  },
}: RootState) => ({
  type
})


const CampaignsCreateInitial: FC = () => {
  return <Container>
    <Erc20 type='erc20' />
  </Container>
}

export default connect(mapStateToProps)(CampaignsCreateInitial)
