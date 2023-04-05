import React, { FC } from 'react'
import {
  Button,
  ButtonLoader,
  Anchor,
  ButtonLink
} from './styled-components'
import { TProps } from './types'

const ButtonComponent: FC<TProps> = ({
  title,
  disabled = false,
  loading = false,
  onClick,
  appearance = 'default',
  className,
  size,
  href,
  target,
  to,
  children
}) => {
    if (href) {
      return <Anchor href={href} target={target}>
        <Button
          disabled={disabled}
          loading={loading}
          appearance={appearance}
          className={className}
          size={size}
        >
          {loading && <ButtonLoader size='small' />}{title || children}
        </Button>
      </Anchor>
    }
    if (to) {
      return <ButtonLink to={to}>
        <Button
          disabled={disabled}
          appearance={appearance}
          loading={loading}
          className={className}
          size={size}
        >
          {loading && <ButtonLoader size='small' />}{title || children}
        </Button>
      </ButtonLink>
    }
    return <Button
      disabled={disabled}
      loading={loading}
      onClick={onClick}
      appearance={appearance}
      className={className}
      size={size}
    >
      {loading && <ButtonLoader size='small' />}{title || children}
    </Button>
}


export default ButtonComponent