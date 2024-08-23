import { Dispatch } from 'redux'
import * as campaignActions from 'data/store/reducers/campaign/actions'
import {
  UserActions,
} from '../types'
import {
  CampaignActions
} from 'data/store/reducers/campaign/types'
import { utils, ethers, BigNumberish, BigNumber } from 'ethers'
import { RootState } from 'data/store'
import { LinkdropFactory, LinkdropMastercopy } from 'abi'
import contracts from 'configs/contracts'
import { defineNativeTokenSymbol, defineNetworkName, alertError } from 'helpers'
import { plausibleApi } from 'data/api'
import { TCountry } from 'types'
import * as actionsUser from '../actions'
import * as actionsAsyncUser from '../async-actions'

const secure = (
  totalNativeTokensAmountToSecure: BigNumber,
  nativeTokensPerLink: string,
  walletApp: string,
  preferredWalletOn: boolean,
  availableСountries: TCountry[],
  availableCountriesOn: boolean,
  expirationDate: number,
  successCallback?: () => void
) => {

  return async (
    dispatch: Dispatch<UserActions>  & Dispatch<CampaignActions>,
    getState: () => RootState
  ) => {

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

    dispatch(campaignActions.setLoading(true))

    const callback = async (dashboardKey: string) => {
      try {
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
        const proxyContract = await new ethers.Contract(proxyContractAddress, LinkdropMastercopy.abi, signer)
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
    
    
        if (totalNativeTokensAmountToSecure.gte(nativeTokenAmount as BigNumberish)) {
          const nativeToken = defineNativeTokenSymbol({ chainId })
          dispatch(campaignActions.setLoading(false))
          return alertError(`Not enough ${nativeToken} on account`)
        }
  
        const transaction = await signer.sendTransaction({
          to,
          from: address,
          value: totalNativeTokensAmountToSecure,
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
          dispatch(campaignActions.setPreferredWalletOn(preferredWalletOn))
          dispatch(campaignActions.setSecured(true))
          dispatch(campaignActions.setCountriesWhitelist(availableСountries.map(country => country.id)))
          dispatch(campaignActions.setCountriesWhitelistOn(availableCountriesOn))
          dispatch(campaignActions.setExpirationDate(expirationDate))
          dispatch(campaignActions.setNativeTokensPerLink(
            utils.parseEther(
              String(
                nativeTokensPerLink || 0
              )
            )
          ))
          dispatch(campaignActions.setSignerKey(privateKey))
          dispatch(campaignActions.setSignerAddress(wallet))
          dispatch(campaignActions.setWallet(walletApp))
          successCallback && successCallback()
        }
        dispatch(campaignActions.setLoading(false))
      } catch (err) {
        console.error({ err })
        dispatch(campaignActions.setLoading(false))
      }
    }

    let dashboardKey = actionsAsyncUser.useDashboardKey(
      getState
    )

    if (!dashboardKey) {
      dispatch(campaignActions.setLoading(false))
      dispatch(actionsUser.setDashboardKeyPopup(true))
      dispatch(actionsUser.setDashboardKeyPopupCallback(callback))
      return 
    }
    
    callback(dashboardKey)
    dispatch(campaignActions.setLoading(false))
    
  }
}

export default secure