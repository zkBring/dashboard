import { FC } from 'react'
import {
  Container,
  AmountBar,
  Value,
  ValueLimit,
  TokenImage,
  ButtonStyled,
  Texts,
  ToggleStyled
} from './styled-components'
import { ethers } from 'ethers'
import TProps from './types'

const defineTexts = (
  valueBN: ethers.BigNumber,
  maxBN: ethers.BigNumber,
  tokenSymbol: string,
) => {
  const ratio = valueBN.div(maxBN).mul(100)
  if (ratio.gte('100')) {
    return <Texts>
      <Value>{valueBN.toString()} {tokenSymbol}</Value>
    </Texts>
  }
  return <Texts>
    <Value>{valueBN.toString()}</Value>
    <ValueLimit>/ {maxBN.toString()} {tokenSymbol}</ValueLimit>
  </Texts>
}

const defineControl = (
  ratio: ethers.BigNumber,
  tokenSymbol: string,
  isPublic: boolean,
  action: (
    isPublic: boolean,
  ) => void
) => {
  const buttonTitle = tokenSymbol ? `+ Get ${tokenSymbol}` : '+ Get'

  if (ratio.gte('100')) {
    return <ToggleStyled
      value={isPublic}
      size='small'
      label='Feature drop'
      onChange={(value) => {
        action(value)
      }}
    />
  }

  return <ButtonStyled
    size='extra-small'
    target='_blank'
    href='https://dexscreener.com/base/0xceb9ce741dc04e87366198c7dc96d76ed74dce6c'
    appearance="additional"
  >
    {buttonTitle}
  </ButtonStyled>
}

const TokenCounter: FC<TProps> = ({
  value,
  max,
  action,
  tokenIcon,
  tokenSymbol,
  isPublic
}) => {
  const valueBN = ethers.BigNumber.from(value)
  const maxBN = ethers.BigNumber.from(max)
  const ratio = valueBN.div(maxBN).mul(100)

  const texts = defineTexts(
    valueBN,
    maxBN,
    tokenSymbol
  )

  const control = defineControl(
    ratio,
    tokenSymbol,
    isPublic,
    action
  )

  return <Container>
    <AmountBar style={{ width: `${ratio}%`}}/>
    <TokenImage>
      {tokenIcon}
    </TokenImage>
    {texts}
    {control}
  </Container>
}

export default TokenCounter