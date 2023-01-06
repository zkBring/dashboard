import { FC } from 'react'
import { NoteWrapper, NoteTitle, IconStyled } from './styled-components'
import TProps from './types'

const Note: FC<TProps> = ({
  children,
  title
}) => {
  return <NoteWrapper>
    <IconStyled />
    {title && <NoteTitle>{title}</NoteTitle>}
    {children}
  </NoteWrapper>
}

export default Note