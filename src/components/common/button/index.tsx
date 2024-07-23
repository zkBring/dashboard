import { FC } from 'react'
import { Anchor, ButtonLink } from './styled-components'
import { TProps } from './types'
import { Button } from 'linkdrop-ui'

const ButtonComponent: FC<TProps> = (props) => {
  const { href, to, target } = props
  if (href) {
    return (
      <Anchor href={href} target={target}>
        <Button {...props} />
      </Anchor>
    )
  }
  console.log({ to })
  if (to) {
    return (
      <ButtonLink to={to}>
        <Button {...props} />
      </ButtonLink>
    )
  }
  return <Button {...props} />
}

export default ButtonComponent
