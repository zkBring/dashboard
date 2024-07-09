import { FC } from 'react'
import { TProps } from './types'
import { Container, Title, CheckBox } from './styled-components'
import Icons from 'icons'

const CheckListItem: FC<TProps> = ({
    title,
    checked
}) => {
  return <Container>
    <CheckBox checked={checked}>
      {checked && <Icons.CheckboxIcon />}
    </CheckBox>
    {title && <Title>{title}</Title>}
  </Container>
}

export default CheckListItem