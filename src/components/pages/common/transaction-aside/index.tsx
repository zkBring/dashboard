import { FC } from 'react'
import { TransactionDetails } from 'components/common'
import { TextBlock, WidgetAside } from './styled-components'

const Aside: FC = () => {
  return <WidgetAside>
    <TextBlock>
      MetaMask will show you <span>Transaction</span><br />pop-up that you need to confirm
    </TextBlock>
    <TransactionDetails />
  </WidgetAside>
}

export default Aside
