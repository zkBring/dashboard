import { FC } from 'react'
import {
  WidgetAside,
} from '../../styled-components'
import { TransactionDetails } from 'components/common'

const Aside: FC = () => {
  return <WidgetAside>
    <TransactionDetails />
  </WidgetAside>
}

export default Aside