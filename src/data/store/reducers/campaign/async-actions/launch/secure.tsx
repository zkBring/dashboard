
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
    // dispatch(campaignActions.setCountriesWhitelist(availableСountries.map(country => country.id)))
    // dispatch(campaignActions.setCountriesWhitelistOn(availableCountriesOn))
    // dispatch(campaignActions.setAdditionalWalletsOn(additionalWalletsOn))
    // dispatch(campaignActions.setExpirationDate(expirationDate))

    // dispatch(campaignActions.setAdditionalWalletsOn(additionalWalletsOn))
    // dispatch(campaignActions.setExpirationDate(expirationDate))

    // dispatch(campaignActions.setNativeTokensPerLink(
    //   utils.parseEther(
    //     String(
    //       nativeTokensPerLink || 0
    //     )
    //   )
    // ))
    dispatch(campaignActions.setSignerKey(privateKey))
    dispatch(campaignActions.setSignerAddress(wallet))
    // dispatch(campaignActions.setWallet(walletApp))
    // successCallback && successCallback()
  }

  return finished
}

export default secure
