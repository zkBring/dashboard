import { FC } from 'react'
import TProps from './types'
import {
  Audience,
  AudienceItem,
  AudienceTitle,
  AudienceImage
} from './styled-components'

const AudienceComponent: FC<TProps> = ({
  options,
  value,
  className,
  onChange
}) => {
  return <Audience className={className}>
    {options.map(item => <AudienceItem 
      disabled={item.disabled}
      active={value === item.value}
      onClick={() => {
        if (item.disabled) {
          return
        }
        onChange(item.value)
      }}
    >
      <AudienceImage>
        {item.image}
      </AudienceImage> 
      <AudienceTitle>
        {item.title}
      </AudienceTitle>
    </AudienceItem>)}
  </Audience>
}

export default AudienceComponent