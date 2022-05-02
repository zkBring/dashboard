import { FC } from 'react'
import TransactionPopupImage from 'images/transaction-popup-image.png'
import { Wrapper, Arrow } from './styled-components'
import Icons from 'icons'

const TransactionDetails: FC = () => {
  return <Wrapper>
    <Arrow>
      <Icons.ArrowIcon />
    </Arrow>
  </Wrapper>
}

export default TransactionDetails
