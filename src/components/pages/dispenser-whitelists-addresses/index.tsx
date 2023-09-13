import { FC, useState } from 'react'
import {
  Buttons,
  Container,
  WidgetStyled,
  ButtonStyled,
  WidgetSubtitleStyled,
  TextAreaStyled
} from './styled-components'
import { parseWhitelistAddresses } from 'helpers'
import { TProps } from './types'

const DispenserWhitelistsAddresses: FC<TProps> = ({
  dispenserId
}) => {
  const [ value, setValue ] = useState<string>(``)
  return <Container>
    <WidgetStyled title='Whitelist addresses'>
      <WidgetSubtitleStyled>Only addresses entered below will be able to claim</WidgetSubtitleStyled>
      <TextAreaStyled
        onChange={(value) => {
          setValue(value)
          return value
        }}
        value={value}
        title='Recepient’s address'
        placeholder={`Be careful and paste addresses here, i.e.:

0xdfs7d8f7s8df98df09s8df98s0df9s80df90sdf,
0xdfs7d8f7s8df98df09s8df98s0df9s80df90sdf,
10xdfs7d8f7s8df98df09s8df98s0df9s80df90sdfand so on
        `}
      />
      <Buttons>
        <ButtonStyled
          to={`/dispensers/${dispenserId}/whitelists`}
        >
          Back
        </ButtonStyled>
        <ButtonStyled
          disabled={!value}
          appearance='action'
          onClick={() => {
            const addresses = parseWhitelistAddresses(value)
            if (!addresses) {
              return alert('Check format')
            }
            console.log({ addresses })
          }}
        >
          Apply
        </ButtonStyled>
      </Buttons>
    </WidgetStyled>
  </Container>
}

export default DispenserWhitelistsAddresses