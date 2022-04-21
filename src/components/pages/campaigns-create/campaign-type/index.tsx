import { FC, ReactNode } from 'react'
import { MiniWidget } from 'components/common'
import { RootState } from 'data/store';
import { connect } from 'react-redux';
import { Container, TypeWidgets, WidgetLogo } from './styled-components'
import { TTokenType } from 'types'
import EthereumLogo from 'images/Ethereum@2x.png'
import RinkebyLogo from 'images/Rinkeby@2x.png'
import PolygonLogo from 'images/Polygon@2x.png'
import { Dispatch } from 'redux';
import * as campaignActions from 'data/store/reducers/campaign/actions'
import { useHistory } from 'react-router-dom'

// import { NewRetroDropActions } from 'data/store/reducers/campaign/types'

// const mapDispatcherToProps = (dispatch: Dispatch<NewRetroDropActions>) => {
//   return {
//     setType: (type: TRetroDropType) => dispatch(newRetroDropActions.setType(type)),
//     completeStep: (step: TRetroDropStep) => dispatch(newRetroDropActions.completeStep(step))
//   }
// }

const mapStateToProps = ({
  campaigns: { campaigns },
  user: { address, chainId }
}: RootState) => ({
  campaigns,
  address,
  chainId
})


const defineLogo = (chainId: number | null): ReactNode => {
  if (chainId === 1) {
    return <WidgetLogo src={EthereumLogo} alt='ethereum' />
  }

  if (chainId === 4) {
    return <WidgetLogo src={RinkebyLogo} alt='rinkeby' />
  }

  if (chainId === 137) {
    return <WidgetLogo src={PolygonLogo} alt='polygon' />
  }
}

type ReduxType = ReturnType<typeof mapStateToProps>
type onTypeChoose = (type: TTokenType) => void

const RetroactiveDrops: FC<ReduxType> = ({ chainId }) => {
  const logo = defineLogo(chainId)
  const history = useHistory()

  const onTypeChoose: onTypeChoose = type => {
    // setType(type)
    // completeStep('choose_type')
    history.push(`/campaigns/new?step=initialize`)
  }
  
  return <div>
    <Container>
      <TypeWidgets>
        <MiniWidget
          title='ERC20'
          description='Fungible tokens'
          buttonTitle='Select Type'
          logo={logo}
          action={() => {
            onTypeChoose('erc20')
          }}
        />
        <MiniWidget
          title='ERC721'
          description='Non fungible tokens (NFT)'
          buttonTitle='Select Type'
          logo={logo}
          action={() => {
            onTypeChoose('erc721')
          }}
        />
        <MiniWidget
          title='ERC1155'
          description='Semi-fungible tokens'
          buttonTitle='Select Type'
          logo={logo}
          action={() => {
            onTypeChoose('erc1155')
          }}
        />
        
        
      </TypeWidgets>
      
      
    </Container>
  </div>
}

export default connect(mapStateToProps)(RetroactiveDrops)
