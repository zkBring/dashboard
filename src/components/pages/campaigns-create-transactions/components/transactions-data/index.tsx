import { FC } from 'react'
import TProps from './types'
import {
  TTable,
  TTableItem,
  TTableItemTitle,
  TTableItemValue
} from './styled-components'
import { ethers } from 'ethers'

const COMISSION_VALUE = 0.003  // 0.3%

const TransactionsData: FC<TProps> = ({
  comission,
  amount,
  totalAmount,
  symbol
}) => {

  return <TTable>
    <TTableItem>
      <TTableItemTitle>
        Tokens required for drop
      </TTableItemTitle>
      <TTableItemValue>
        {amount} {symbol}
      </TTableItemValue>
    </TTableItem>


    <TTableItem>
      <TTableItemTitle>
        Fee (0.3%)
      </TTableItemTitle>
      <TTableItemValue>
      {comission} {symbol}
      </TTableItemValue>
    </TTableItem>


    <TTableItem>
      <TTableItemTitle>
        Total
      </TTableItemTitle>
      <TTableItemValue>
        {totalAmount} {symbol}
      </TTableItemValue>
    </TTableItem>
  </TTable>
}

export default TransactionsData