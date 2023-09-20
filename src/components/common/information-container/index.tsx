import { FC, useState, useEffect } from 'react'
import { TProps } from './types'
import {
  Title,
  Container,
  Content,
  CloseButton,
  ContentItem,
  ContentItemText,
  ContentItemLink
} from './styled-components'
import Icons from 'icons'

const InformationContainer: FC<TProps> = ({
  title,
  id,
  className,
  contents
}) => {
  const [ visible, setVisible ] = useState<boolean | null>(null)
  
  useEffect(() => {
    if (id) {
      if (window.localStorage) {
        if (window.localStorage.getItem(`information-container-${id}`) === 'false') {
          return setVisible(false)
        }
      }
    }
    setVisible(true)
  }, [])

  const onClose = () => {
    window.localStorage.setItem(`information-container-${id}`, 'false')
    setVisible(false)
  }

  if (!visible) { return null }

  return <Container className={className}>
    <CloseButton onClick={onClose}>
      <Icons.CloseCircleIcon />
    </CloseButton>
    {title && <Title>{title}</Title>}
    <Content>
      {contents.map(content => <ContentItem key={content.title}>
        <ContentItemText>{content.title}</ContentItemText>
        {content.link && <ContentItemLink href={content.link.href} target='_blank'>{content.link.title}</ContentItemLink>}
      </ContentItem>)}
    </Content>
  </Container>
}

export default InformationContainer