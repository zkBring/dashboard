import styled from 'styled-components'
import { ProgressBar } from 'components/common'

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 400px;
`

export const GenerateProgressBar = styled(ProgressBar)`
  min-width: 500px;
`