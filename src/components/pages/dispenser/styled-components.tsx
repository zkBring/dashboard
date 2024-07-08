import styled from 'styled-components'
import { Button } from 'components/common'
import {
  WidgetComponent,
  Aside
} from 'components/pages/common'
import {
  CopyContainer,
  Input
} from 'linkdrop-ui'

export const WidgetValue = styled.div`
  font-weight: 600;
  font-size: 32px;
`

export const Buttons = styled.div`
  display: grid;
  grid-template-columns: 1fr;
`

export const WidgetButton = styled(Button)`
  width: 100%;
`


export const WidgetComponentStyled = styled(WidgetComponent)`
  max-width: 546px;
`

export const CopyContainerStyled = styled(CopyContainer)`
  margin-bottom: 32px;
  max-width: 100%;
`

export const InputComponent = styled(Input)`
  margin-bottom: 10px;
`

export const PopupFormContent = styled.div`
  margin-bottom: 20px;
  padding-top: 20px;
`

export const PopupForm = styled.form`
`

export const Counter = styled.div`
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 16px;
`

export const SecondaryTextSpan = styled.span`
  color: ${props => props.theme.additionalTextColor};
`

export const MainContent = styled.div`
  margin-right: 24px;
  flex: 1 0 50%;
`

export const DynamicQRImage = styled.img`
  max-width: 240px;
  margin: 0 auto 32px;
  display: block;
`