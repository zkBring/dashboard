import { Title } from 'components/common'
import { Container, ErrorCode } from './styled-components'

const NotFound = () => {
  return <Container>
    <Title>Page not found</Title>
    <ErrorCode>404</ErrorCode>
  </Container>
}

export default NotFound
