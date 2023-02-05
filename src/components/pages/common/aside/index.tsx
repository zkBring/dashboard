import { TProps } from './types'
import { FC, useState } from 'react'
import {
  WidgetComponent,
  WidgetAside,
  ButtonsContainer,
  WidgetSubtitle
} from '../index'
import Icons from 'icons'

import {
  ButtonStyled, 
  WidgetOptions,
  WidgetTitle,
  WidgetTitleFlex,
  MiniPopupContainerStyled,
  OptionsList,
  OptionsListItem,
  OptionsListBorder,
  TitleLoader
} from './styled-components'

const Aside: FC<TProps> = ({
  className,
  children,
  back: {
    action: backAction,
    disabled: backDisabled,
    title: backTitle = "Back",
    loading: backLoading = false,
    appearance: backAppearance
  } = {},
  next: {
    action: nextAction,
    disabled: nextDisabled,
    title: nextTitle = "Next",
    loading: nextLoading = false,
    appearance: nextAppearance = 'action'
  } = {},
  title,
  subtitle,
  options,
  loading
}) => {

  const [ showOptions, setShowOptions ] = useState(false)

  const defineHeaderContents = () => {
    if (loading) {
      return  <WidgetTitleFlex>
        {title}
        <TitleLoader />
      </WidgetTitleFlex>
    }
    if (options) {
      return <WidgetTitleFlex>
        {title}
        <WidgetOptions onClick={() => {
          setShowOptions(!showOptions)
        }}>
          <Icons.OptionsIcon />
          {showOptions && <MiniPopupContainerStyled onClose={() => { setShowOptions(false) }}>
            <OptionsList>
              {options.map(option => {
                return <>
                  <OptionsListItem
                    disabled={option.disabled}
                    onClick={() => {
                      if (option.disabled) { return }
                      setShowOptions(false)
                      option.action && option.action()
                    }}
                  >
                    {option.icon}{option.title}
                  </OptionsListItem>
                  {option.bordered && <OptionsListBorder />}
                </>
              })} 
            </OptionsList>
            
          </MiniPopupContainerStyled>}
        </WidgetOptions>
      </WidgetTitleFlex>
    }

    return <WidgetTitle>
      {title}
    </WidgetTitle>
  }

  return <WidgetAside className={className}>
    <WidgetComponent>
      {defineHeaderContents()}
      {subtitle && <WidgetSubtitle>{subtitle}</WidgetSubtitle>}
      {children}
      {(backAction || nextAction) && <ButtonsContainer>
        {backAction && <ButtonStyled loading={backLoading} disabled={Boolean(backDisabled)} appearance={backAppearance} onClick={backAction}>{backTitle}</ButtonStyled>}
        {nextAction && <ButtonStyled loading={nextLoading} disabled={Boolean(nextDisabled)} appearance={nextAppearance} onClick={nextAction}>{nextTitle}</ButtonStyled>}
      </ButtonsContainer>}
    </WidgetComponent>
  </WidgetAside>
}


export default Aside