import { Dispatch } from 'redux'
import * as campaignActions from 'data/store/reducers/campaign/actions'
import {
  UserActions
} from '../types'
import {
  CampaignActions
} from 'data/store/reducers/campaign/types'
import { utils, ethers } from 'ethers'
import { RootState } from 'data/store'
import contracts from 'configs/contracts'
import { defineContract } from 'helpers'

const grantRole = (
  callback?: () => void
) => {
  return async (
    dispatch: Dispatch<UserActions> & Dispatch<CampaignActions>,
    getState: () => RootState
  ) => {
    const {
      user: {
        provider,
        address,
        chainId
      },
      campaign: {
        tokenAddress,
        assets,
        symbol,
        decimals,
        proxyContractAddress,
        tokenStandard
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

      if (!chainId) {
        return alert('No chainId provided')
      }

      if (!tokenStandard) {
        return alert('No tokenStandard provided')
      }

      dispatch(campaignActions.setLoading(true))
      const contract = contracts[chainId]
      const signer = await provider.getSigner()
      const gasPrice = await provider.getGasPrice()
      const oneGwei = utils.parseUnits('1', 'gwei')
      const contractABI = (defineContract(tokenStandard)).abi
      const contractInstance = await new ethers.Contract(tokenAddress, contractABI, signer)
      let iface = new utils.Interface(contractABI)
      const data = await iface.encodeFunctionData('grantRole', [
        contract.minter_role, proxyContractAddress
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
            const hasRole = await contractInstance.hasRole(contract.minter_role, proxyContractAddress)
            if (hasRole) {
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

export default grantRole
