import styled from 'styled-components'
import { ProgressBar } from 'linkdrop-ui'
import {
  Title,
  Widget
} from 'components/common'

export const WidgetStyled = styled(Widget)`
 
  width: 100%;
  margin: 0 auto;
  max-width: 800px;
  position: relative;
  padding-top: 175px;

  > div {
    display: grid;
    justify-content: center;
    grid-template-rows: min-content 1fr min-content;
    height: 100%;
    min-height: 320px;
  }
`

export const GenerateProgressBar = styled(ProgressBar)`
  max-width: 100px;
  margin: 0 auto 15px;
  height: 3px;
  border-radius: 2px;
  background: ${props => props.theme.blankColor};

  div {
    background: ${props => props.theme.primaryTextColor};
  }
`

export const GenerateWidgetTitle = styled(Title)`
  font-family: 'FKRasterRoman', Arial, sans-serif;
  font-weight: 400;
  text-align: center;
`

export const GenerateTitle = styled.h2`
  text-align: center;
  font-size: 16px;
  margin: 0 0 5px;
  font-weight: 400;
  color: ${props => props.theme.primaryTextColor};
`

export const GenerateSubtitle = styled.h2`
  text-align: center;
  font-size: 13px;
  margin: 0;
  line-height: 20px;
  color: ${props => props.theme.additionalTextColor};
`

export const GenerateProgress = styled.p`
  text-align: center;
  font-size: 14px;
  margin: 0 0 16px;
  line-height: 20px;
  font-weight: 400;
  color: ${props => props.theme.primaryTextColor};
`


export const GenerateImage = styled.img`
  max-width: 49px;
  justify-self: center;
  display: block;
  margin: 0 auto;
`

export const GenerateContent = styled.div`
  max-width: 322px;
  margin-top: auto;
`