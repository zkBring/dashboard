import { FC } from 'react'
import { Button } from './styled-components'
import { TProps } from './types'

const ButtonComponent: FC<TProps> = ({
  title,
  disabled = false,
  loading = false,
  onClick,
  appearance = 'default',
  className,
  size = 'default',
  children,
}) => {
  return (
    <Button
      disabled={disabled}
      loading={loading ? 'true' : undefined}
      onClick={onClick}
      appearance={appearance}
      className={className}
      size={size}
      data-testid='button'
    >
      {title || children}
    </Button>
  )
}

export default ButtonComponent
