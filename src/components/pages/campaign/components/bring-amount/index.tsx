import { FC, useEffect, useState } from 'react'
import { getBringAmount } from 'helpers'
import { RootState } from 'data/store'
import { connect } from 'react-redux'
import { ethers } from 'ethers'
import {
  Header,
  WidgetTitleStyled,
  WidgetComponent,
  TextStyled
} from '../../styled-components'
import Icons from 'icons'
import {
  TokenCounterStyled
} from './styled-components'

const mapStateToProps = ({
  user: { address, signer },
}: RootState) => ({
  address,
  signer
})

type ReduxType = ReturnType<typeof mapStateToProps>


const BringAmount: FC<ReduxType> = ({
  address,
  signer
}) => {
  const [
    bringAmount,
    setBringAmount
  ] = useState<null | string>(null)

  useEffect(() => {
    const init = async () => {
      const bringAmount = await getBringAmount(
        address,
        signer
      )
      if (bringAmount) {
        const amoutFormatted = ethers.utils.formatUnits(
          bringAmount.tokenAmount,
          bringAmount.tokenDecimals
        )
        setBringAmount(
          amoutFormatted.toString().split('.')[0]
        )
      }
    }

    init()
  }, [])

  return <WidgetComponent>
    <Header>
      <WidgetTitleStyled>
        Get featured on Bring platform
      </WidgetTitleStyled>
    </Header>

    <TextStyled>
      Hold at least 5,000,000 BRING tokens in your wallet to have your drop featured on the zkBring homepage and discovery section. You currently hold:
    </TextStyled>

    <TokenCounterStyled
      value={ethers.BigNumber.from(bringAmount || '0')}
      tokenSymbol='BRING'
      tokenIcon={<Icons.BringTokenIcon />}
      max={ethers.BigNumber.from('5000000')}
    />

  </WidgetComponent>
}

export default connect(
  mapStateToProps
)(BringAmount)