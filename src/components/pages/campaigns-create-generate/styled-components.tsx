import styled from 'styled-components'
import { ProgressBar } from 'components/common'

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  min-height: 400px;
  max-width: 250px;
  margin: 0 auto;
`

export const GenerateProgressBar = styled(ProgressBar)`
  min-width: 200px;
`

export const GenerateTitle = styled.h2`
  text-align: center;
  font-size: 22px;
  margin: 0 0 16px;
  color: ${props => props.theme.primaryTextColor};
`

export const GenerateSubtitle = styled.h2`
  text-align: center;
  font-size: 14px;
  margin: 0 0 16px;
  line-height: 20px;
  font-weight: 400;
  color: ${props => props.theme.additionalTextColor};
`

export const GenerateProgress = styled.p`
  text-align: center;
  font-size: 14px;
  margin: 0 0 16px;
  line-height: 20px;
  font-weight: 700;
  color: ${props => props.theme.primaryTextColor};
`
