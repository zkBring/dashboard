import * as actions from '../actions'
import {
  TGetTokenBalance
} from '../types'
import { utils } from 'ethers'

const getTokenAmount: TGetTokenBalance = async (
  dispatch,
  address,
  decimals,
  contractInstance
) => {
  try {
    const tokenAmount = await contractInstance.balanceOf(address)
    const tokenAmountFormatted = utils.formatUnits(
      String(tokenAmount),
      decimals
    )
    console.log({ tokenAmountFormatted })
    dispatch(actions.setTokenAmount(
      tokenAmount,
      tokenAmountFormatted
    ))
  } catch (err) {
    console.log({
      err
    })
  } 
}

export default getTokenAmount