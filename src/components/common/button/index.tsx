import { FC } from 'react'
import { Anchor, ButtonLink } from './styled-components'
import { TProps } from './types'
import { OriginalButton } from '..'

const ButtonComponent: FC<TProps> = (props) => {
  const { href, to, target } = props
  if (href) {
    return (
      <Anchor href={href} target={target}>
        <OriginalButton {...props} />
      </Anchor>
    )
  }
  if (to) {
    return (
      <ButtonLink to={to}>
        <OriginalButton {...props} />
      </ButtonLink>
    )
  }
  return <OriginalButton {...props} />
}

export default ButtonComponent
