import { FC } from 'react'
import { NoteWrapper, NoteTitle, IconStyled } from './styled-components'
import TProps from './types'

const Note: FC<TProps> = ({
  children,
  title,
  type = 'default',
  className
}) => {
  return <NoteWrapper className={className} type={type}>
    <IconStyled type={type} />
    {title && <NoteTitle>{title}</NoteTitle>}
    {children}
  </NoteWrapper>
}

export default Note