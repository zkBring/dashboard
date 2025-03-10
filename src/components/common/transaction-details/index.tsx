import { FC } from 'react'
import { Wrapper, Arrow, TransactionDetailsImage } from './styled-components'
import Icons from 'icons'


const TransactionDetails: FC = () => {
  return <Wrapper>
    <Arrow>
      <Icons.ArrowIcon />
    </Arrow>
  </Wrapper>
}

export default TransactionDetails
