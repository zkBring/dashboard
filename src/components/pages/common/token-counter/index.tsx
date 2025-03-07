import { FC } from 'react'
import {
  Container,
  AmountBar,
  Value,
  ValueLimit,
  TokenImage,
  ButtonStyled,
  Texts
} from './styled-components'
import { ethers } from 'ethers'
import TProps from './types'

const TokenCounter: FC<TProps> = ({
  value,
  max,
  action,
  tokenIcon,
  tokenSymbol
}) => {
  const valueBN = ethers.BigNumber.from(value)
  const maxBN = ethers.BigNumber.from(max)
  const ratio = valueBN.div(maxBN).mul(100)

  const buttonTitle = tokenSymbol ? `+ Get ${tokenSymbol}` : '+ Get'
  return <Container>
    <AmountBar style={{ width: `${ratio}%`}}/>
    <TokenImage>
      {tokenIcon}
    </TokenImage>
    <Texts>
      <Value>{valueBN.toString()}</Value>
      <ValueLimit>/ {maxBN.toString()}</ValueLimit>
    </Texts>


    <ButtonStyled size='extra-small' onClick={action} appearance="additional">
      {buttonTitle}
    </ButtonStyled>
  </Container>
}

export default TokenCounter