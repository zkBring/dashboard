import { TextLink, TextRouterLink } from './styled-components'
import { FC } from 'react'

type TProps = {
  href?: string,
  to?: string,
  target?: string,
  children?: any,
  className?: string
}

const TextLinkComponent: FC<TProps> = ({
  href,
  target,
  children,
  to,
  className
}) => {
  if (to) {
    return <TextRouterLink className={className} to={to}>{children}</TextRouterLink>
  }
  return <TextLink className={className} href={href} target={target}>{children}</TextLink>
}

export default TextLinkComponent