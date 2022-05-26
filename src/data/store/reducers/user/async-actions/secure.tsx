import { Dispatch } from 'redux'
import * as campaignActions from 'data/store/reducers/campaign/actions'
import {
  UserActions,
} from '../types'
import {
  CampaignActions
} from 'data/store/reducers/campaign/types'
import { utils, ethers } from 'ethers'
import { LINK_COMISSION_PRICE } from 'configs/app'
import { RootState } from 'data/store';
import { LinkdropFactory, LinkdropMastercopy } from 'abi'
const { REACT_APP_FACTORY_ADDRESS } = process.env

const secure = (
  sponsored: boolean,
  amount: string,
  callback?: () => void
) => {
  return async (dispatch: Dispatch<UserActions>  & Dispatch<CampaignActions>, getState: () => RootState) => {
    const {
      user: {
        provider,
        address
      },
      campaign: {
        proxyContractAddress,
        id,
        assets,
        symbol
      }
    } = getState()
    try {
      if (!REACT_APP_FACTORY_ADDRESS) {
        return alert('REACT_APP_FACTORY_ADDRESS is not provided in .env file')
      }
      if (!LINK_COMISSION_PRICE) {
        return alert('No LINK_COMISSION_PRICE provided')
      }
      if (!proxyContractAddress) {
        return alert('No proxy address provided')
      }
      if (!assets) {
        return alert('No assets provided')
      }
      if (!symbol) {
        return alert('No symbol provided')
      }
      dispatch(campaignActions.setLoading(true))
      const newWallet = ethers.Wallet.createRandom()
      const { address: wallet, privateKey } = newWallet
      const signer = await provider.getSigner()
      const gasPrice = await provider.getGasPrice()
      const oneGwei = utils.parseUnits('1', 'gwei')
      const factoryContract = await new ethers.Contract(REACT_APP_FACTORY_ADDRESS, LinkdropFactory.abi, signer)
      const isDeployed = await factoryContract.isDeployed(address, id)
      let data
      let to
      const proxyContract = await new ethers.Contract(proxyContractAddress, LinkdropMastercopy.abi, provider)
      console.log({ isDeployed })
      if (!isDeployed) {
        let iface = new utils.Interface(LinkdropFactory.abi)
        data = await iface.encodeFunctionData('deployProxyWithSigner', [
          id, wallet
        ])
        to = REACT_APP_FACTORY_ADDRESS
        console.log({ REACT_APP_FACTORY_ADDRESS })
      } else {
        let iface = new utils.Interface(LinkdropMastercopy.abi)
        data = await iface.encodeFunctionData('addSigner', [
          wallet
        ])
        to = proxyContractAddress
        console.log({ proxyContractAddress })
      }
      
  
      const value = utils.parseEther(String(amount))
      console.log({ value: String(value) })
      const transaction = await signer.sendTransaction({
        to,
        gasPrice: gasPrice.add(oneGwei),
        from: address,
        value,
        data: data
      })
      console.log({ transaction }) // hash
  
      // 0xc8378e0281d8efd061e3b3bdfc1d5b37746e84a967e4f4f5e88616024d30ef30
  
      const checkTransaction = async function (): Promise<boolean> {
        return new Promise((resolve, reject) => {
          const checkInterval = setInterval(async () => {
            try {
              const res = await proxyContract.isLinkdropSigner(wallet)
              if (res) {
                resolve(true)
                clearInterval(checkInterval)
              }
              // const receipt = await provider.getTransactionReceipt(transaction.hash)
              // if (receipt && receipt.status === 0) {
              //   console.log('waiting')
              // } else if (receipt && receipt.status === 1 && receipt.confirmations != null && receipt.confirmations > 0) {
              //   resolve(true)
              //   clearInterval(checkInterval)
              // }
            } catch (err) {
              console.log({ err })
            }
            
          }, 3000)
        })
      }
      const finished = await checkTransaction()
      if (finished) {
        dispatch(campaignActions.setSecured(true))
        dispatch(campaignActions.setPrivateKey(privateKey))
        dispatch(campaignActions.setSponsored(sponsored))
        callback && callback()
      }
      dispatch(campaignActions.setLoading(false))
    } catch (err) {
      console.error({ err })
      dispatch(campaignActions.setLoading(false))
    }
  }
}

export default secure