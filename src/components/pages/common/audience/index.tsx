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
  className
}) => {
  return <Audience className={className}>
    {options.map(item => <AudienceItem>
      <AudienceImage src={item.image} alt={item.title} /> 
      <AudienceTitle>
        {item.title}
      </AudienceTitle>
    </AudienceItem>)}
  </Audience>
}

export default AudienceComponent