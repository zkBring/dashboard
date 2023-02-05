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
// required params
  apiKey: {
    key: <YOUR API KEY>, // key starts with "TEST-CLIENT-XXXXXX" for dev environments
    mode: "client" | "server"
  }
  // optional params
  apiHost: string, // overrides api host
  claimApiUrl: string // api url that will be used as prefix for claim links
})

const init = async () => {
  const campaign = await sdk.getCampaign(
    campaignId: string,
    signerKey: string,
    encryptionKey: string
  )
}

init()

`}
    </Code>

  </WidgetComponent>
}

export default HowToUseSDK