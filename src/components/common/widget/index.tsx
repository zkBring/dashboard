import React, { FC } from 'react'
import { WidgetComponent, WidgetContent, WidgetTitle } from './styled-components'
import { TProps } from './types'

const Widget: FC<TProps> = ({ children, className, title }) => {
  return <WidgetComponent className={className}>
    {title && <WidgetTitle>{title}</WidgetTitle>}
    <WidgetContent>
      {children}
    </WidgetContent>
  </WidgetComponent>
}

export default Widget