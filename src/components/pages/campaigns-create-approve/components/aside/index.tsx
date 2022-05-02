import { FC } from 'react'
import {
  WidgetAside,
} from '../../styled-components'
import { TAsset } from 'types'
import { add, bignumber } from 'mathjs'
import { TransactionDetails } from 'components/common'

const Aside: FC = () => {
  return <WidgetAside>
    <TransactionDetails />
  </WidgetAside>
}

export default Aside