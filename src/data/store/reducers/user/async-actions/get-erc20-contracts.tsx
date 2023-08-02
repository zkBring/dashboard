import { Dispatch } from 'redux'
import * as userActions from 'data/store/reducers/user/actions'
import {
  UserActions
} from '../types'
import {
  CampaignActions
} from 'data/store/reducers/campaign/types'
import { RootState } from 'data/store'
import { Alchemy } from 'alchemy-sdk'
import { TAlchemyERC20Contract } from 'types'
import { defineAlchemyNetwork, alertError } from 'helpers'
import { BigNumber } from 'ethers'
const { REACT_APP_ALCHEMY_API_KEY } = process.env

const getERC20Contracts = () => {
  return async (
    dispatch: Dispatch<UserActions> & Dispatch<CampaignActions>,
    getState: () => RootState
  ) => {
    dispatch(userActions.setLoading(true))
    try {
      const { user: { address, chainId, signer, tokenListERC20 } } = getState()
      if (!chainId) {
        return alertError('chainId is not provided')
      }
      const network = defineAlchemyNetwork(chainId)
      if (network) {
        const alchemy = new Alchemy({
          apiKey: REACT_APP_ALCHEMY_API_KEY,
          network
        })
        const start = +new Date()
        const { tokenBalances } = await alchemy.core.getTokenBalances(address)
        if (tokenBalances && tokenBalances.length > 0) {
            const contractsWithMetadata: TAlchemyERC20Contract[] = []
            for (let token of tokenBalances) {
              if (token.tokenBalance && parseInt(token.tokenBalance, 16) === 0) {
                continue
              }
  
              // commented for now, possible to use later
              // const contractInstance = await new ethers.Contract(token.contractAddress, ERC20Contract.abi, signer)
              // const decimals = await contractInstance.decimals()
              // const symbol = await contractInstance.symbol()
  
              
              // const tokenWithMetadata: TAlchemyERC20Contract = {
              //   address: token.contractAddress,
              //   totalBalance: !token.tokenBalance ? '0' : String(
              //     ethers.utils.formatUnits(
              //       BigNumber.from(
              //         token.tokenBalance.toString()
              //       ).toString(),
              //       decimals
              //     )
              //   ),
              //   tokenType: 'ERC20',
              //   symbol
              // }
  
              if (!tokenListERC20) {
                continue
              }
  
              const tokenListInstance = tokenListERC20[token.contractAddress.toLocaleLowerCase()]
  
              if (!tokenListInstance) {
                continue
              }
  
              const tokenWithMetadata: TAlchemyERC20Contract = {
                address: token.contractAddress,
                tokenType: 'ERC20',
                totalBalance: !token.tokenBalance ? '0' : String(
                  BigNumber.from(
                    token.tokenBalance.toString()
                  ).toString(),
                ),
                symbol: tokenListInstance.symbol,
                decimals: tokenListInstance.decimals
              }
              
              contractsWithMetadata.push(tokenWithMetadata)
            }
            dispatch(userActions.setContractsERC20(contractsWithMetadata as TAlchemyERC20Contract[]))
        }
        const totalTimeToFetch = +new Date() - start
      }
      
    } catch (err) {
      alertError('Check console for more information')
      console.error({ err })
    }
    dispatch(userActions.setLoading(false))
  }
}

export default getERC20Contracts
