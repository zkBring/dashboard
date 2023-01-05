import { FC } from 'react'
import img from 'images/transaction-popup-image.png'
import { Wrapper, Arrow, TransactionDetailsImage } from './styled-components'
import Icons from 'icons'


const TransactionDetails: FC = () => {
  return <Wrapper>
    <TransactionDetailsImage src={img} />
    <Arrow>
      <Icons.ArrowIcon />
    </Arrow>
  </Wrapper>
}

export default TransactionDetails
