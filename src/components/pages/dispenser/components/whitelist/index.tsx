import { FC, useEffect, useState } from 'react'
import {
  WidgetStyled,
  Header,
  ToggleStyled,
  WidgetTitleStyled,
  WidgetContent,
  WidgetSubtitleStyled,
  WidgetButtonStyled
} from './styled-components'
import { TProps } from './types'
import {
  Buttons,
  
} from '../../styled-components'
import {
  TableRow,
  TableText,
  TableValue
} from 'components/pages/common'

const Whitelist: FC<TProps> = ({
  isWhitelisted,
  dispenserId,
  whitelistType,
  toggleWhitelistOn
}) => {
  const [
    enabled, setEnabled
  ] = useState<boolean>(Boolean(isWhitelisted))
  const [
    loading, setLoading
  ] = useState<boolean>(false)

  return <WidgetStyled>
    <Header>
      <WidgetTitleStyled>
        Whitelist
      </WidgetTitleStyled>
      <ToggleStyled
        value={enabled}
        onChange={(value => {
          setLoading(true)
          toggleWhitelistOn(
            !enabled,
            () => {
              setLoading(false)
              setEnabled(!enabled)
            },
            () => {
              setLoading(true)
            }
          )
        })}
      />
    </Header>
    <WidgetSubtitleStyled>
      You can set up who can claim by whitelisting users by addresses, emails or twitter handles
    </WidgetSubtitleStyled>
    {enabled && <>
      <WidgetContent>
        <TableRow>
          <TableText>Conditions</TableText>
          <TableValue>{!whitelistType ? 'Anyone can claim' : 'By address'}</TableValue>
        </TableRow>

       
      </WidgetContent>
      <Buttons>
        <WidgetButtonStyled
          appearance='action'
          to={`/dispensers/${dispenserId}/whitelists`}
        >
          Edit
        </WidgetButtonStyled>
      </Buttons>
    </>}

  </WidgetStyled>
}

export default Whitelist