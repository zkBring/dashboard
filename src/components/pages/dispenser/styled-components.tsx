import styled from 'styled-components'
import { Button } from 'components/common'
import {
  WidgetComponent, Aside, WidgetTitle
} from 'components/pages/common'
import { CopyContainer, Input } from 'linkdrop-ui'

export const WidgetValue = styled.div`
  font-weight: 600;
  font-size: 32px;
`

export const Buttons = styled.div`
  display: flex;
  justify-content: end;

  & > button {
    margin-left: 16px;
  }
`

export const WidgetButton = styled(Button)`
`

export const WidgetComponentStyled = styled(WidgetComponent)`
  margin-right: 24px;
  &:last-child {
    margin-right: 0px;
  }
`

export const CopyContainerStyled = styled(CopyContainer)`
  margin-bottom: 32px;
  max-width: 500px;
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

export const AsideContent = styled.div`
  margin-bottom: 32px;
`

export const AsideSubtitle = styled.h3`
  margin: 0 0 12px;
  font-size: 14px;
  font-weight: 600;
`

export const Counter = styled.div`
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 16px;
`

export const SecondaryTextSpan = styled.span`
  color: ${props => props.theme.additionalTextColor};
`

export const AsideStyled = styled(Aside)`
  min-width: 50%;
  margin: 0;
`
