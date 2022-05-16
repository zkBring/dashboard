import { Dispatch } from 'redux'
import * as actions from '../actions'
import {
  UserActions
} from '../types'
import Web3Modal from "web3modal"
import { Web3Provider } from '@ethersproject/providers'
import WalletConnectProvider from "@walletconnect/web3-provider"
import { INFURA_ID } from 'configs/app'
import { IAppDispatch } from 'data/store';
import {
  initialization,
  getNativeTokenAmount
 } from './index'

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

async function connectWallet (dispatch: Dispatch<UserActions> & IAppDispatch) {
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

export default connectWallet