import { Dispatch } from 'redux';
import * as actionsCollections from '../actions'
import { CollectionsActions } from '../types'
import { UserActions } from '../../user/types'
import { IAppDispatch } from 'data/store'
import { alertError } from 'helpers'
import { RootState } from 'data/store'
import { createThirdwebClient, defineChain } from "thirdweb";
import { ethers5Adapter } from "thirdweb/adapters/ethers5";
import { deployPublishedContract } from "thirdweb/deploys";
import { collectionsApi } from 'data/api'
import { TCollection } from 'types'
import CollectionPlaceholder from 'images/collection-placeholder.png'

const { REACT_APP_THIRDWEB_CLIENT_ID } = process.env

function createCollectionERC1155(
  title: string,
  symbol: string,
  file?: File,
  base64File?: string,
  callback?: (collection_id: string) => void
) {
  // @ts-ignore
  return async (
    dispatch: Dispatch<CollectionsActions> & Dispatch<UserActions> & IAppDispatch,
    getState: () => RootState
  ) => {
    dispatch(actionsCollections.setLoading(true))
    const { user: { chainId, address, signer } } = getState()

    try {
      const chain = defineChain(Number(chainId))

      if (!chain) {
        return alertError('Network is not supported')
      }

      const account = await ethers5Adapter.signer.fromEthers({ signer });

      const client = createThirdwebClient({
        clientId: REACT_APP_THIRDWEB_CLIENT_ID as string
      });

      // @ts-ignore
      const address = await deployPublishedContract({
        client,
        chain,
        account,
        contractId: "Soulbound",
        contractParams: [account.address, title, symbol],
        publisher: "0x3C2F0873bE11B0d3840fd8279A2994e66b76E498",
      });

      const result: { data: { success: boolean, collection: TCollection } } = await collectionsApi.create({
        title,
        symbol,
        thumbnail: base64File || CollectionPlaceholder,
        sbt: true,
        token_standard: 'ERC1155',
        token_address: address,
        chain_id: String(chainId)
      })

      if (result.data.success) {
        dispatch(actionsCollections.addCollection(result.data.collection))

        if (callback) {
          callback(result.data.collection.collection_id as string)
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
