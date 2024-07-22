import { TextLink, TextRouterLink, TextButton } from './styled-components'
import { FC } from 'react'
import { TProps } from './types'

const TextLinkComponent: FC<TProps> = ({
  href,
  target,
  children,
  to,
  className,
  onClick
}) => {
  if (onClick) {
    return <TextButton className={className} onClick={onClick}>{children}</TextButton>
  }
  if (to) {
    return <TextRouterLink className={className} to={to}>{children}</TextRouterLink>
  }
  return <TextLink className={className} href={href} target={target}>{children}</TextLink>
}

export default TextLinkComponent