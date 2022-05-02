import { Dispatch } from 'redux'
import * as actions from './actions'
import {
  UserActions,
  TGetNativeTokenBalance,
  TGetTokenBalance
} from './types'
import { IMetamaskError } from 'types'
import Web3Modal from "web3modal"
import { Web3Provider } from '@ethersproject/providers'
import WalletConnectProvider from "@walletconnect/web3-provider"
import { toHex } from 'helpers'
import chains from 'configs/chains'
import { utils } from 'ethers'

const { REACT_APP_INFURA_ID } = process.env

const supportedNetworkURLs = {
  1: `https://mainnet.infura.io/v3/${REACT_APP_INFURA_ID}`,
  4: `https://rinkeby.infura.io/v3/${REACT_APP_INFURA_ID}`,
  3: `https://ropsten.infura.io/v3/${REACT_APP_INFURA_ID}`,
  5: `https://goerli.infura.io/v3/${REACT_APP_INFURA_ID}`,
  42: `https://kovan.infura.io/v3/${REACT_APP_INFURA_ID}`,
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

export async function connectWallet (dispatch: Dispatch<UserActions>) {
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: REACT_APP_INFURA_ID,
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
  await getNativeTokenAmount(
    dispatch,
    chainId,
    address,
    providerWeb3
  )

  provider.on("accountsChanged", async (accounts: string[]) => {
    const address = accounts[0] && accounts[0].toLowerCase()
    dispatch(actions.setAddress(address))
    await getNativeTokenAmount(
      dispatch,
      chainId,
      address,
      providerWeb3
    )
  });
  
  // Subscribe to chainId change
  provider.on("chainChanged", (chainId: string) => {
    let chainIdConverted = parseInt(chainId, 16);
    dispatch(actions.setChainId(chainIdConverted))
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
    console.log({ tokenAmount, tokenAmountFormatted })
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

export const approve: TGetTokenBalance = async (
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
    console.log({ tokenAmount, tokenAmountFormatted })
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