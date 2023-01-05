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
    title: backTitle = "Back",
    loading: backLoading = false
  } = {},
  next: {
    action: nextAction,
    disabled: nextDisabled,
    title: nextTitle = "Next",
    loading: nextLoading = false
  } = {},
  title,
  subtitle,
}) => {
  return <WidgetAside>
    <WidgetComponent>
      <WidgetTitle>{title}</WidgetTitle>
      {subtitle && <WidgetSubtitle>{subtitle}</WidgetSubtitle>}
      {children}
      {(backAction || nextAction) && <ButtonsContainer>
        {backAction && <ButtonStyled loading={backLoading} disabled={Boolean(backDisabled)} onClick={backAction}>{backTitle}</ButtonStyled>}
        {nextAction && <ButtonStyled loading={nextLoading} disabled={Boolean(nextDisabled)} appearance='action' onClick={nextAction}>{nextTitle}</ButtonStyled>}
      </ButtonsContainer>}
    </WidgetComponent>
  </WidgetAside>
}


export default Aside