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
          href: 'https://linkdrop-2.gitbook.io/linkdrop-knoe/how-tos/main-guide/setting-up-a-campaign'
        }
      }, {
        title: 'Distributing NFTs with QRs, claim codes or links',
        link: {
          title: 'Read the guide ->',
          href: 'https://linkdrop-2.gitbook.io/linkdrop-knoe/how-tos/distribution-qrs-claim-codes-or-links'
        }
      }, {
        title: 'Integrating SDK for custom logic',
        link: {
          title: 'Read the guide ->',
          href: 'https://linkdrop-2.gitbook.io/linkdrop-knoe/sdk'
        }
      }
    ]}
  />
}

export default InitialGuide