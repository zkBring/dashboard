import { Dispatch } from 'redux'
import * as campaignActions from 'data/store/reducers/campaign/actions'
import {
  UserActions
} from '../types'
import {
  CampaignActions
} from 'data/store/reducers/campaign/types'
import { utils, ethers } from 'ethers'
import { RootState } from 'data/store';
import { ERC20Contract } from 'abi'
import { TAssetsData, TLinkContent } from 'types'

const approve = (
  assets: TAssetsData,
  assetsOriginal: TLinkContent[],
  sdk: boolean,
  callback?: () => void
) => {
  return async (
    dispatch: Dispatch<UserActions> & Dispatch<CampaignActions>,
    getState: () => RootState
  ) => {
    dispatch(campaignActions.setAssets(assets))
    dispatch(campaignActions.setSdk(sdk))
    dispatch(campaignActions.setAssetsOriginal(assetsOriginal))
    const {
      user: {
        provider,
        address
      },
      campaign: {
        tokenAddress,
        symbol,
        decimals,
        proxyContractAddress
      }
    } = getState()

    try {
      if (!tokenAddress) {
        return alert('No token address provided')
      }
      if (!assets) {
        return alert('No assets provided')
      }
      if (!symbol) {
        return alert('No symbol provided')
      }
      if (!decimals) {
        return alert('No decimals provided')
      }
      if (!proxyContractAddress) {
        return alert('No proxy address provided')
      }
      if (!address) {
        return alert('No user address provided')
      }
      dispatch(campaignActions.setLoading(true))
      dispatch(campaignActions.setClaimPattern('transfer'))
      const signer = await provider.getSigner()
      const gasPrice = await provider.getGasPrice()
      const oneGwei = utils.parseUnits('1', 'gwei')
      const contractInstance = await new ethers.Contract(tokenAddress, ERC20Contract.abi, signer)
      let iface = new utils.Interface(ERC20Contract.abi)
      const data = await iface.encodeFunctionData('approve', [
        proxyContractAddress, ethers.constants.MaxUint256
      ])

      await signer.sendTransaction({
        to: tokenAddress,
        gasPrice: gasPrice.add(oneGwei),
        from: address,
        value: 0,
        data: data
      })
  
      const checkTransaction = async function (): Promise<boolean> {
        return new Promise((resolve, reject) => {
          const checkInterval = setInterval(async () => {
            const allowed = await contractInstance.allowance(address, proxyContractAddress)
            if (allowed >= ethers.constants.MaxUint256) {
              resolve(true)
              clearInterval(checkInterval)
            }
          }, 3000)
        })
      }
      const finished = await checkTransaction()
      if (finished) {
        dispatch(campaignActions.setApproved(true))
        if (callback) { callback() }
      }
    } catch (err) {
      console.log({
        err
      })
    }
    dispatch(campaignActions.setLoading(false))
  }
}

export default approve
