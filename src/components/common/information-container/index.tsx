import { FC, useState, useEffect } from 'react'
import { TProps } from './types'
import {
  Title,
  Container,
  Content,
  CloseButton
} from './styled-components'
import Icons from 'icons'

const InformationContainer: FC<TProps> = ({
  title,
  id,
  className,
  children,
  appendToLocalStorage
}) => {
  const [ visible, setVisible ] = useState<boolean | null>(null)
  
  useEffect(() => {
    if (appendToLocalStorage) {
      if (id) {
        if (window.localStorage) {
          if (window.localStorage.getItem(`information-container-${id}`) === 'false') {
            return setVisible(false)
          }
        }
      }
    }
  
    setVisible(true)
  }, [])

  const onClose = () => {
    if (appendToLocalStorage) {
      window.localStorage.setItem(`information-container-${id}`, 'false')
    }
    setVisible(false)
  }

  if (!visible) { return null }

  return <Container className={className}>
    <CloseButton onClick={onClose}>
      <Icons.CloseCircleIcon />
    </CloseButton>
    {title && <Title>{title}</Title>}
    <Content>
      {children}
    </Content>
  </Container>
}

export default InformationContainer