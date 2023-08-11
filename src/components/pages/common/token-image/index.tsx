import { FC } from 'react'
import { TokenImageContainer, TokenVideoContainer } from './styled-components'
import { TProps } from './types'
import TokenPlaceholder from 'images/token-placeholder.png'

const TokenImage: FC<TProps> = ({
  src,
  address,
  className
}) => {
  if (!src) {
    return <TokenImageContainer
      src={TokenPlaceholder}
      alt={address}
      className={className}
    />
  }
  if (src.includes('video')) {
    return <TokenVideoContainer autoPlay loop muted key={src}>
      <source src={src} />
      Your browser does not support the video tag.
    </TokenVideoContainer>
  }

  return <TokenImageContainer
    src={src}
    alt={address}
    className={className}
  />
}


export default TokenImage