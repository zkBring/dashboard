import { FC } from 'react'
import {
  Options,
  Option,
  Container,
  WidgetStyled,
  WidgetTitleStyled,
  Header,
  ButtonStyled,
  WidgetSubtitleStyled
} from './styled-components'
import { TProps } from './types'

const DispenserWhitelists: FC<TProps> = ({
  dispenserId
}) => {
  return <Container>
    <Options>
      <Option>
        <WidgetStyled>
          <Header>
            <WidgetTitleStyled>
              Whitelist addresses
            </WidgetTitleStyled>
            <ButtonStyled
              size='extra-small'
              appearance='action'
              to={`/dispensers/${dispenserId}/whitelists/addresses`}
            >Set up</ButtonStyled>
          </Header>
          <WidgetSubtitleStyled>
            Set up who can claim by whitelisting users by their wallet addresses
          </WidgetSubtitleStyled>
        </WidgetStyled>
      </Option>

      <Option>
        <WidgetStyled>
          <Header>
            <WidgetTitleStyled>
              Whitelist twitter handles
              
            </WidgetTitleStyled>
            <ButtonStyled size='extra-small'>Contact us</ButtonStyled>
          </Header>
          <WidgetSubtitleStyled>
            Set up who can claim by whitelisting users by their twitter handles
          </WidgetSubtitleStyled>
        </WidgetStyled>
      </Option>

      <Option>
        <WidgetStyled>
          <Header>
            <WidgetTitleStyled>
              Whitelist emails
              
            </WidgetTitleStyled>
            <ButtonStyled size='extra-small'>Contact us</ButtonStyled>
          </Header>
          <WidgetSubtitleStyled>
            Set up who can claim by whitelisting users by their email addresses
          </WidgetSubtitleStyled>
        </WidgetStyled>
      </Option>
    </Options>
  </Container>
}

export default DispenserWhitelists