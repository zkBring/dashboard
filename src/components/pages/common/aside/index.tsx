import { TProps } from './types'
import { FC } from 'react'
import {
  WidgetComponent,
  WidgetAside,
  ButtonsContainer,
  WidgetTitle,
  WidgetSubtitle
} from '../index'

import { ButtonStyled } from './styled-components'

const Aside: FC<TProps> = ({
  children,
  back: {
    action: backAction,
    disabled: backDisabled,
    title: backTitle = "Back"
  } = {},
  next: {
    action: nextAction,
    disabled: nextDisabled,
    title: nextTitle = "Next"
  } = {},
  title,
  subtitle,
}) => {
  return <WidgetAside>
    <WidgetComponent>
      <WidgetTitle>Summary</WidgetTitle>
      <WidgetSubtitle>Check your campaign’s details before going next</WidgetSubtitle>
      {children}
      <ButtonsContainer>
        <ButtonStyled disabled={Boolean(backDisabled)} onClick={backAction}>{backTitle}</ButtonStyled>
        <ButtonStyled disabled={Boolean(nextDisabled)} appearance='action' onClick={nextAction}>{nextTitle}</ButtonStyled>
      </ButtonsContainer>
    </WidgetComponent>
  </WidgetAside>
}


export default Aside