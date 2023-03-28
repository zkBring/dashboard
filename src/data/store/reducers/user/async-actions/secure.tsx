import { Dispatch } from 'redux'
import * as campaignActions from 'data/store/reducers/campaign/actions'
import {
  UserActions,
} from '../types'
import {
  CampaignActions
} from 'data/store/reducers/campaign/types'
import { utils, ethers, BigNumberish } from 'ethers'
import { RootState } from 'data/store'
import { LinkdropFactory, LinkdropMastercopy } from 'abi'
import contracts from 'configs/contracts'
import { defineNativeTokenSymbol, defineNetworkName } from 'helpers'
import { plausibleApi } from 'data/api'

const secure = (
  totalNativeTokensAmountToSecure: string,
  nativeTokensPerLink: string,
  walletApp: string,
  callback?: () => void
) => {
  return async (dispatch: Dispatch<UserActions>  & Dispatch<CampaignActions>, getState: () => RootState) => {
    const {
      user: {
        provider,
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

    try {
      if (!proxyContractAddress) {
        return alert('No proxy address provided')
      }
      if (!symbol) {
        return alert('No symbol provided')
      }
      if (!chainId) {
        return alert('No chainId provided')
      }
      const contract = contracts[chainId]
      dispatch(campaignActions.setLoading(true))
      const newWallet = ethers.Wallet.createRandom()
      const { address: wallet, privateKey } = newWallet
      const signer = await provider.getSigner()
      const factoryContract = await new ethers.Contract(contract.factory, LinkdropFactory.abi, signer)
      const isDeployed = await factoryContract.isDeployed(address, id)
      let data
      let to
      const proxyContract = await new ethers.Contract(proxyContractAddress, LinkdropMastercopy.abi, provider)
      plausibleApi.invokeEvent({
        eventName: 'camp_step4_filled',
        data: {
          network: defineNetworkName(chainId),
          token_type: tokenStandard as string,
          claim_pattern: claimPattern,
          distribution: sdk ? 'sdk' : 'manual',
          sponsorship: sponsored ? 'sponsored' : 'non sponsored',
          preferred_wallet: walletApp,
          extra_token: nativeTokensPerLink === '0' ? 'no' : 'yes'
        }
      })
      
      if (!isDeployed) {
        let iface = new utils.Interface(LinkdropFactory.abi)
        data = await iface.encodeFunctionData('deployProxyWithSigner', [
          id, wallet, claimPattern === 'mint' ? 1 : 0
        ])
        to = contract.factory
      } else {
        let iface = new utils.Interface(LinkdropMastercopy.abi)
        data = await iface.encodeFunctionData('addSigner', [
          wallet
        ])
        to = proxyContractAddress
        console.log({ proxyContractAddress })
      }
  
      const value = utils.parseEther(String(totalNativeTokensAmountToSecure))
      if (value.gte(nativeTokenAmount as BigNumberish)) {
        const nativeToken = defineNativeTokenSymbol({ chainId })
        dispatch(campaignActions.setLoading(false))
        return alert(`Not enough ${nativeToken} on account`)
      }

      const transaction = await signer.sendTransaction({
        to,
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
              console.log({ wallet })
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
        console.log({ nativeTokensPerLink })
        dispatch(campaignActions.setSecured(true))
        dispatch(campaignActions.setNativeTokensPerLink(
          String(
            utils.parseEther(
              String(
                nativeTokensPerLink || 0
              )
            )
          )
        ))
        dispatch(campaignActions.setSignerKey(privateKey))
        dispatch(campaignActions.setSignerAddress(wallet))
        dispatch(campaignActions.setWallet(walletApp))
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