import { FC, useState } from 'react'
import { WidgetStyled, Header, ToggleStyled, WidgetTitleStyled } from './styled-components'
import { TProps } from './types'
import { WidgetSubtitle } from 'components/pages/common'

const Redirect: FC<TProps> = ({
  hasRedirect,
  dispenserStatus
}) => {
  const [
    enabled, setEnabled
  ] = useState<boolean>(Boolean(hasRedirect))

  if (dispenserStatus !== 'FINISHED') {
    return null
  }
  return <WidgetStyled>
    <Header>
      <WidgetTitleStyled>
      Redirect to another URL
      </WidgetTitleStyled>
      <ToggleStyled
        value={enabled}
        onChange={(value => {
          setEnabled(value)
      })} />
    </Header>
    <WidgetSubtitle>
      Your campaign is finished, but existing link could redirect to the new dispenser link or any website
    </WidgetSubtitle>

  </WidgetStyled>
}

export default Redirect