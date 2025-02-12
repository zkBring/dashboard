import { FC } from 'react'
import { TransactionDetails } from 'components/common'
import { WidgetAside } from './styled-components'

const Aside: FC = () => {
  return <>
    MetaMask will show you <span>Transaction</span><br />pop-up that you need to confirm
    <TransactionDetails />
  </>
}

export default Aside
