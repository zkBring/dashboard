import React, { FC } from 'react'
import {
    Button,
    ButtonLoader,
    Anchor,
    ButtonLink
} from './styled-components'

interface Props {
  title: string,
  disabled?: boolean,
  loading?: boolean,
  onClick?: () => void,
  appearance?: 'action' | 'action-inverted' | 'default' | 'default-inverted',
  className?: string,
  size?: 'default' | 'small',
  href?: string,
  to?: string,
  target?: '_blank' | '_self' | '_parent' | '_top',
  type?: string
}

const ButtonComponent: FC<Props> = ({
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
          appearance={appearance}
          className={className}
          size={size}
        >
          {title || children}
        </Button>
      </Anchor>
    }
    if (to) {
      return <ButtonLink to={to}>
        <Button
          disabled={disabled}
          appearance={appearance}
          className={className}
          size={size}
        >
          {title || children}
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