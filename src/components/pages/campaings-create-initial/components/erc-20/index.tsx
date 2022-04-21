import { FC, useState } from 'react'
import {
  Container,
  WidgetComponent,
  WidgetContent,
  WidgetOptions,
  WidgetAside
} from '../../styled-components'
import { NATIVE_TOKEN_ADDRESS } from 'configs/app'
import { Input } from 'components/common'

const Erc20: FC = () => {
  const [
    tokenAddress,
    setTokenAddress
  ] = useState('')
  return <Container>
    <WidgetComponent title='ERC-20'>
      <WidgetContent>
        <WidgetOptions>
          <Input
            value={tokenAddress}
            placeholder='0x Address'
            onChange={value => {
              console.log(value)
              return value
            }}
            title='Contract Address'
          />
        </WidgetOptions>
        <WidgetAside>
          Aside
        </WidgetAside>
      </WidgetContent>
       
    </WidgetComponent>
  </Container>
}

export default Erc20
