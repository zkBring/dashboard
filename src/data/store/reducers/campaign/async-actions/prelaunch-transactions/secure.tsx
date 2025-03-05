
import { Dispatch } from 'redux'
import * as actionsCampaign from '../../actions'
import { CampaignActions } from '../../types'
import { TAssetsData, TLinkContent } from 'types'
import { IAppDispatch } from 'data/store'
import { RootState } from 'data/store'
import * as campaignActions from 'data/store/reducers/campaign/actions'
import { ethers, utils } from 'ethers'
import contracts from 'configs/contracts'
import { alertError } from 'helpers'
import { LinkdropFactory, LinkdropMastercopy } from 'abi'

function secure (
  callback?: () => void
) {

  return async (
    dispatch: Dispatch<CampaignActions> & IAppDispatch,
    getState: () => RootState
  ) => {
    dispatch(campaignActions.setLoading(true))

    try {
      const {
        user: {
          signer,
          address,
          chainId,
          nativeTokenAmount
        },
        campaign: {
          proxyContractAddress,
          id,
          symbol,
          claimPattern,
          tokenStandard,
          sdk,
          sponsored
        }
      } = getState()
    
      if (!proxyContractAddress) {
        dispatch(campaignActions.setLoading(false))
        return alertError('No proxy address provided')
      }
      if (!symbol) {
        dispatch(campaignActions.setLoading(false))
        return alertError('No symbol provided')
      }
      if (!chainId) {
        dispatch(campaignActions.setLoading(false))
        return alertError('No chainId provided')
      }
    
      const contract = contracts[chainId]
      dispatch(campaignActions.setLoading(true))
      const newWallet = ethers.Wallet.createRandom()
      const { address: wallet, privateKey } = newWallet
      const factoryContract = new ethers.Contract(contract.factory, LinkdropFactory.abi, signer)
      const isDeployed = await factoryContract.isDeployed(address, id)
      let data
      let to
      const proxyContract = new ethers.Contract(proxyContractAddress, LinkdropMastercopy.abi, signer)
      
      
      if (!isDeployed) {
        let iface = new utils.Interface(LinkdropFactory.abi)
        data = iface.encodeFunctionData('deployProxyWithSigner', [
          id, wallet, claimPattern === 'mint' ? 1 : 0
        ])
        to = contract.factory
      } else {
        let iface = new utils.Interface(LinkdropMastercopy.abi)
        data = iface.encodeFunctionData('addSigner', [
          wallet
        ])
        to = proxyContractAddress
      }
    
      await signer.sendTransaction({
        to,
        from: address,
        value: '0',
        data: data
      })
    
      const checkTransaction = async function (): Promise<boolean> {
        return new Promise((resolve, reject) => {
          const checkInterval = setInterval(async () => {
            try {
              const res = await proxyContract.isLinkdropSigner(wallet)
              if (res) {
                resolve(true)
                clearInterval(checkInterval)
              }
            } catch (err) {
              console.log({ err })
            }
            
          }, 3000)
        })
      }
      const finished = await checkTransaction()
      if (finished) {
        dispatch(campaignActions.setSecured(true))
        dispatch(campaignActions.setSignerKey(privateKey))
        dispatch(campaignActions.setSignerAddress(wallet))
        dispatch(campaignActions.setTransactionStage('approve'))
      }
    } catch (err) {
      console.log({ err })
      alertError('Some error occured. Please check console for more info')
    }
    dispatch(campaignActions.setLoading(false))

  }

  
}

export default secure
