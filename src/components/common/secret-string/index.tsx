import { FC, useState } from 'react'
import { TProps } from './types'
import { Container, IconStyled } from './styled-components'
import Icons from 'icons'
import { copyToClipboard } from 'helpers'

const SecretString: FC<TProps> =  ({
  text,
  ableToCopy
}) => {
  const [ visible, setVisible ] = useState(false)
  return <Container visible={visible}>
    {visible ? text : new Array(text.length).fill('●').join('')}
    {visible && ableToCopy && <IconStyled
      onClick={() => copyToClipboard({ value: text })}
    >
      <Icons.ClipboardCopyIcon />
    </IconStyled>}
    <IconStyled onClick={() => {
      setVisible(!visible)
    }}>
      
      {visible ? <Icons.EyeOpenIcon /> : <Icons.EyeClosedIcon />}
    </IconStyled>
  </Container>
}

export default SecretString
