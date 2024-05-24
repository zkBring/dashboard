import { FC } from 'react'
import {
  InformationContainerStyled
} from './styled-components'

const InitialGuide: FC = () => {
  return <InformationContainerStyled
    title='Getting started'
    id='initial_guide'
    contents={[
      {
        title: 'Setting up a campaign',
        link: {
          title: 'Read the guide ->',
          href: 'https://docs.linkdrop.io/how-tos/main-guide/setting-up-a-campaign'
        }
      }, {
        title: 'Distributing NFTs with QRs, claim codes or links',
        link: {
          title: 'Read the guide ->',
          href: 'https://docs.linkdrop.io/how-tos/distribution-qrs-claim-codes-or-links'
        }
      },
      // {
      //   title: 'Integrating SDK for custom logic',
      //   link: {
      //     title: 'Read the guide ->',
      //     href: 'https://docs.linkdrop.io/sdk'
      //   }
      // }
    ]}
  />
}

export default InitialGuide