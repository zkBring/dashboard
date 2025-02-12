import { TProps } from './types'
import { FC, useState } from 'react'
import {
  WidgetComponent,
  WidgetSubtitle
} from '../index'
import Icons from 'icons'
import {
  WidgetOptions,
  WidgetTitle,
  WidgetTitleFlex,
  MiniPopupContainerStyled,
  OptionsList,
  OptionsListItem,
  OptionsListBorder,
  TitleLoader,
  AsideWrapper
} from './styled-components'

const Aside: FC<TProps> = ({
  className,
  children,
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

  return <AsideWrapper className={className}>
    {defineHeaderContents()}
    {subtitle && <WidgetSubtitle>{subtitle}</WidgetSubtitle>}
    {children}
  </AsideWrapper>
}


export default Aside