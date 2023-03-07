import { FC } from 'react'
import { TProps } from './types'
import { Code } from './styled-components'
import {
  WidgetComponent
} from 'components/pages/common'
import { NoteStyled } from '../../styled-components'

const HowToUseSDK: FC<TProps> = ({
  sdk
}) => {
  if (!sdk) { return null }
  return <WidgetComponent
    title='How to use'
  >
    <NoteStyled type='warning'>
      Be careful! Code below includes private data. Do not share publicly. Sharing may lead to loss of assets
    </NoteStyled>
    <Code>
{`// installation: yarn add @linkdrop/sdk
// import library
import LinkdropSDK from '@linkdrop/sdk'

const sdk = new LinkdropSDK({
  // optional params
  mode: 'testnets', // for goerli and mumbai networks
})

const init = async () => {

  // Get campaign
  const campaign = await sdk.getCampaign(
    campaignId: string,
    signerKey: string, // signer key decrypted with dashboard key
    encryptionKey: string // key for link encryption
  )
  // Get all params from "Campaign parameters" block above

  // Create batch
  const batch = await campaign.createBatch(
    [{ 
      id: string, // Token id (needed for ERC721/ERC1155 campaign)
      amount: string, // Amount of tokens per link (needed for ERC20/ERC1155 campaign)
      links: string, // Amount of links
      weiAmount: string, // Amount of native tokens. Should be  
    }],
    // optional parameters
    {
      sponsored: boolean,
      // if set to true claim will be paid by campaign creator. Default: true
      batchDescription: string,
      // description of batch. Default: 'Created by SDK'
      shortCodeLength: number,
      // length of short code (default: 12)
      shortCodeMixRegister: boolean
      // should short code be in mixed register (default: true)
    }
  )

  // Get all batches of campaign
  const batches = await campaign.getBatches()

  // Get batch by id
  const batch = await campaign.getBatch(
    batchId: string // id of batch
  )

  // Add links to batch
  const links = await batch.addLinks([{ 
    id: string, 
    amount: string, 
    links: string, 
    weiAmount: string,
  }], {
    shortCodeLength: number,
    // length of short code (default: 12)
    shortCodeMixRegister: boolean
    // should short code be in mixed register (default: true)
  }) 
}

init()

`}
    </Code>

  </WidgetComponent>
}

export default HowToUseSDK