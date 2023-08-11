import { FC } from 'react'
import { TokenImageContainer } from './styled-components'
import { TProps } from './types'

const TokenImage: FC<TProps> = ({
  src,
  address,
  className
}) => {
  return <TokenImageContainer src={src} alt={address} className={className}/>
}


export default TokenImage