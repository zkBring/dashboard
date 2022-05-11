import { Dispatch } from 'redux'
import * as actions from './actions'
import * as campaignActions from 'data/store/reducers/campaign/actions'
import {
  UserActions,
  TGetNativeTokenBalance,
  TGetTokenBalance
} from './types'
import {
  CampaignActions
} from 'data/store/reducers/campaign/types'
import { IMetamaskError } from 'types'
import Web3Modal from "web3modal"
import { add, bignumber, multiply, format } from 'mathjs'
import { Web3Provider } from '@ethersproject/providers'
import WalletConnectProvider from "@walletconnect/web3-provider"
import {
  toHex,
  defineNetworkName,
  defineJSONRpcUrl,
  countAssetsTotalAmountERC20
} from 'helpers'
import chains from 'configs/chains'
import { utils, ethers } from 'ethers'
import LinkdropSDK from '@linkdrop/sdk'
import { CLAIM_HOST, INFURA_ID, LINK_COMISSION_PRICE } from 'configs/app'
import { RootState, IAppDispatch } from 'data/store';
import { ERC20Contract, LinkdropFactory, LinkdropMastercopy } from 'abi'
const { REACT_APP_FACTORY_ADDRESS } = process.env

const supportedNetworkURLs = {
  1: `https://mainnet.infura.io/v3/${INFURA_ID}`,
  4: `https://rinkeby.infura.io/v3/${INFURA_ID}`,
  3: `https://ropsten.infura.io/v3/${INFURA_ID}`,
  5: `https://goerli.infura.io/v3/${INFURA_ID}`,
  42: `https://kovan.infura.io/v3/${INFURA_ID}`,
  137: 'https://rpc-mainnet.maticvigil.com/',
  80001: 'https://rpc-mumbai.maticvigil.com/v1/f592ae2e5afb3bebe39314e9bd0949de5b74cd2f'
  // 97: 'https://data-seed-prebsc-1-s1.binance.org:8545/'
}

function sleep(timeout: number) {
  return new Promise((resolve) => setTimeout(() => resolve(true), timeout))
}

export async function addItemAsync(dispatch: Dispatch<UserActions>, item: string) {
  dispatch(actions.setLoading(true));
  await sleep(1000);
  dispatch(actions.setAddress(item));
  dispatch(actions.setLoading(false));
}

export async function connectWallet (dispatch: Dispatch<UserActions> & IAppDispatch) {
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: INFURA_ID,
        qrcode: true,
        rpc: supportedNetworkURLs
      }
    }
  };
  const web3Modal = new Web3Modal({
    cacheProvider: false, // optional
    providerOptions // required
  })
  const provider = await web3Modal.connect();

  const providerWeb3 = new Web3Provider(provider)
  
  let { chainId } = await providerWeb3.getNetwork()
  // if (chainId !== 4) {
  //   return alert('Currently only Rinkeby is available.')
  // }
  
  const accounts = await providerWeb3.listAccounts()
  const address = accounts[0] && accounts[0].toLowerCase()
  dispatch(actions.setProvider(providerWeb3))
  dispatch(actions.setAddress(address))
  dispatch(actions.setChainId(chainId))
  dispatch(initialization(chainId, address))

  await getNativeTokenAmount(
    dispatch,
    chainId,
    address,
    providerWeb3
  )

  provider.on("accountsChanged", async (accounts: string[]) => {
    const address = accounts[0] && accounts[0].toLowerCase()
    dispatch(actions.setAddress(address))
    dispatch(initialization(chainId, address))
    await getNativeTokenAmount(
      dispatch,
      chainId,
      address,
      providerWeb3
    )
  });
  
  // Subscribe to chainId change
  provider.on("chainChanged", async (chainId: string) => {
    let chainIdConverted = parseInt(chainId, 16);
    dispatch(actions.setChainId(chainIdConverted))
    dispatch(initialization(Number(chainId), address))
    await getNativeTokenAmount(
      dispatch,
      chainIdConverted,
      address,
      providerWeb3
    )
  });
}

export async function switchWallet (
  dispatch: Dispatch<UserActions>,
	provider: any,
  chainId: number
) {
  console.log(toHex(chainId))
  try {
    await provider.provider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: toHex(chainId) }],
    });
  } catch (err) {
      
      const switchError = err as IMetamaskError;
      if (switchError.code && switchError.code === 4902) {
        try {
          const chainObj = chains[chainId]
          if (chainObj) {
            const data = {
              ...chainObj,
              chainId: `0x${toHex(chainId)}`
            }
            await provider.request({
              method: 'wallet_addEthereumChain',
              params: [data],
            })
          }
        } catch (addError) {
          // handle "add" error
        }
      }    
  }
}


export const getNativeTokenAmount: TGetNativeTokenBalance = async (
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
    console.log({
      err
    })
  }
}

export const getTokenAmount: TGetTokenBalance = async (
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

export const approve = (
  callback?: () => void
) => {
  return async (dispatch: Dispatch<UserActions> & Dispatch<CampaignActions>, getState: () => RootState) => {
    const {
      user: {
        provider,
        address
      },
      campaign: {
        tokenAddress,
        assets,
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
      const signer = await provider.getSigner()
      const gasPrice = await provider.getGasPrice()
      const oneGwei = utils.parseUnits('1', 'gwei')
      const contractInstance = await new ethers.Contract(tokenAddress, ERC20Contract.abi, signer)
      let iface = new utils.Interface(ERC20Contract.abi)
      const assetsTotal = countAssetsTotalAmountERC20(assets, symbol)
      const amountFormatted = assetsTotal.amount
      const data = await iface.encodeFunctionData('approve', [
        proxyContractAddress, String(amountFormatted)
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
            if (allowed >= amountFormatted) {
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
  }
}

export const secure = (
  sponsored: boolean,
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
    if (!isDeployed) {
      let iface = new utils.Interface(LinkdropFactory.abi)
      data = await iface.encodeFunctionData('deployProxyWithSigner', [
        id, wallet
      ])
      to = REACT_APP_FACTORY_ADDRESS
    } else {
      let iface = new utils.Interface(LinkdropMastercopy.abi)
      data = await iface.encodeFunctionData('addSigner', [
        wallet
      ])
      to = proxyContractAddress
    }
    const assetsTotal = countAssetsTotalAmountERC20(assets, symbol)
    //
    const comission = bignumber(String(LINK_COMISSION_PRICE))
    const nativeTokensAmount = !sponsored ? assetsTotal.originalNativeTokensAmount : add(
      assetsTotal.originalNativeTokensAmount,
      (multiply(
        comission,
        assets.length
      ))
    )

    const value = utils.parseEther(String(nativeTokensAmount))
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
          const res = await proxyContract.isLinkdropSigner(address)
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
  }
}



export const initialization = (
  chainId: number | null, address: string
) => {
  return async (dispatch: Dispatch<UserActions>, getState: () => RootState) => {
    if (!REACT_APP_FACTORY_ADDRESS) {
      return alert('REACT_APP_FACTORY_ADDRESS is not provided in .env file')
    }
    if (!CLAIM_HOST) {
      return alert('CLAIM_HOST is not provided in configs/app file')
    }
    if (!chainId) {
      return alert('Chain is not detected')
    }
    if (!INFURA_ID) {
      return alert('INFURA_ID is not provided in configs/app file')
    }
    const networkName = defineNetworkName(chainId)
    const jsonRpcUrl = defineJSONRpcUrl({ chainId, infuraPk: INFURA_ID })
    const sdk = new LinkdropSDK({
      claimHost: CLAIM_HOST,
      factoryAddress: REACT_APP_FACTORY_ADDRESS,
      chain: networkName,
      linkdropMasterAddress: address,
      jsonRpcUrl,
      apiHost: `https://${networkName}.linkdrop.io`
    })

    dispatch(actions.setSDK(sdk))
  }
}