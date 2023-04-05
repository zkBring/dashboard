import * as actions from '../actions'
import {
  TGetNativeTokenBalance
} from '../types'
import { utils } from 'ethers'
import { alertError } from 'helpers'

const getNativeTokenAmount: TGetNativeTokenBalance = async (
  dispatch,
  chainId,
  address,
  provider
) => {
  try {
    const nativeTokenAmount = await provider.getBalance(address)
    const nativeTokenAmountFormatted = utils.formatEther(nativeTokenAmount)
    console.log({
      nativeTokenAmount,
      nativeTokenAmountFormatted
    })
    dispatch(actions.setNativeTokenAmount(
      nativeTokenAmount,
      nativeTokenAmountFormatted
    ))
  } catch (err) {
    alertError('Error with native tokens amount fetch, check console for information')
    console.error({
      err
    })
  }
}

export default getNativeTokenAmount