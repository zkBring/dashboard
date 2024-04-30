import { utils, BigNumber } from 'ethers'

type TDefineIfUserHasEnoughERC20Tokens = (
  balance: BigNumber,
  expectedAmount: string,
  expectedLinks: string,
  decimals: number | null
) => boolean

const defineIfUserHasEnoughERC20Tokens: TDefineIfUserHasEnoughERC20Tokens = (
  balance,
  expectedAmount,
  expectedLinks,
  decimals
) => {
  const tokensPerLink = utils.parseUnits(expectedAmount, decimals || 18)
  const expectedTokens = BigNumber.from(tokensPerLink).mul(expectedLinks)
  return balance.gte(expectedTokens)
}

export default defineIfUserHasEnoughERC20Tokens