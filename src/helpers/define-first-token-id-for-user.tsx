import { utils, ethers } from 'ethers'
import {  LinkdropMastercopy } from 'abi'
import defineCampaignStatus from './define-campaign-status'
import { TNFTToken } from 'types'

const defineFirstTokenIdForUser = (
  nfts: TNFTToken[]
) => {
  if (nfts[0]) return nfts[0].tokenId
  return '0'
}
export default defineFirstTokenIdForUser