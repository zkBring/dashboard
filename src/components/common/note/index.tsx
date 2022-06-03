import { FC } from 'react'
import { NoteWrapper } from './styled-components'
import TProps from './types'

const Note: FC<TProps> = ({
  children
}) => {
  return <NoteWrapper>
    {children}
  </NoteWrapper>
}

export default Note