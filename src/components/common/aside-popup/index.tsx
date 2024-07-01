import { FC } from 'react'
import {
  Container,
  Title,
  Subtitle,
  Content,
  Controls,
  Note,
  Overlay,
  ToggleStyled
} from './styled-components'
import { Button } from '..'
import { TProps } from './types'

const AsidePopup: FC<TProps> = ({
  title,
  subtitle,
  children,
  note,
  onClose,
  action,
  actionDisabled,
  actionTitle = 'OK',
  toggleAction,
  toggleState = false
}) => {
  return <Overlay>
    <Container>
      <Title>
        {title}
        {toggleAction && <ToggleStyled
          value={toggleState}
          onChange={() => toggleAction(!toggleState)}
        />}
      </Title>
      <Subtitle>{subtitle}</Subtitle>
      <Content>
        {children}
      </Content>
      <Controls>
        {note && <Note>{note}</Note>}
        <Button onClick={onClose}>Cancel</Button>
        <Button disabled={actionDisabled} appearance='action' onClick={action}>{actionTitle}</Button>
      </Controls>
    </Container>
  </Overlay>
  
}

export default AsidePopup
