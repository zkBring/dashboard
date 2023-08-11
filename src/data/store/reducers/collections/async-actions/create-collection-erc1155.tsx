
import { Dispatch } from 'redux';
import * as actionsCollections from '../actions'
import { CollectionsActions } from '../types'
import { UserActions } from '../../user/types'
import { IAppDispatch } from 'data/store'
import {  defineThirdwebNetworkName, alertError } from 'helpers'
import { RootState } from 'data/store'
import { ThirdwebSDK } from '@thirdweb-dev/sdk'
import { collectionsApi } from 'data/api'
import { TCollection } from 'types'

const { REACT_APP_THIRDWEB_CLIENT_ID } = process.env

function createCollectionERC1155(
  title: string,
  symbol: string,
  mint: boolean,
  sbt: boolean,
  file?: File,
  base64File?: string,
  callback?: () => void 
) {
  // @ts-ignore
  return async (
    dispatch: Dispatch<CollectionsActions> & Dispatch<UserActions> & IAppDispatch,
    getState: () => RootState
  ) => {
    dispatch(actionsCollections.setLoading(true))
    const { user: { chainId, address, signer } } = getState()

    try {
      const networkName = defineThirdwebNetworkName(chainId)

      const sdk = ThirdwebSDK.fromSigner(signer, networkName, {
        clientId: REACT_APP_THIRDWEB_CLIENT_ID as string
      })

      const contract = await sdk.deployer.deployBuiltInContract("edition", {
        name: title,
        primary_sale_recipient: address,
        voting_token_address: address,
        symbol,
        image: file
      })

      const result: { data: { success: boolean, collection: TCollection } } = await collectionsApi.create({
        title,
        symbol,
        thumbnail: base64File,
        sbt,
        token_standard: 'ERC1155',
        token_address: contract,
        claim_pattern: mint ? 'mint' : 'transfer',
        chain_id: String(chainId)
      })

      if (result.data.success) {
        dispatch(actionsCollections.addCollection(result.data.collection))

        if (callback) {
          callback()
        }
      }

    } catch (err) {
      console.error({
        err
      })
      alertError('Some error occured. Please check console for more info')
    }
    dispatch(actionsCollections.setLoading(false))
  }
}

export default createCollectionERC1155
