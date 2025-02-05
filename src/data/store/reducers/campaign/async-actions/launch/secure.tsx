
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

async function secure (
  dispatch: Dispatch<CampaignActions> & IAppDispatch,
  getState: () => RootState
) {

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
    return alertError('No proxy address provided')
  }
  if (!symbol) {
    return alertError('No symbol provided')
  }
  if (!chainId) {
    return alertError('No chainId provided')
  }

  try {
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
  } catch (err) {
    console.error({ err })
  }
}

export default secure
