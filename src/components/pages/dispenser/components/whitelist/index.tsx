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
import { TDispenserWhitelistType } from 'types'

const renderContent = (
  dispenserId: string,
  enabled: boolean,
  loading: boolean,
  whitelistType?: TDispenserWhitelistType,
) => {
  if (!enabled && !whitelistType) {
    return <Buttons>
      <WidgetButtonStyled
        appearance='action'
        disabled={loading}
        to={`/dispensers/${dispenserId}/whitelists`}
      >
        Set up
      </WidgetButtonStyled>
    </Buttons>
  }

  return <>
    <WidgetContent>
      <TableRow>
        <TableText>Conditions</TableText>
        <TableValue>By address</TableValue>
      </TableRow>

    
    </WidgetContent>
    <Buttons>
      <WidgetButtonStyled
        disabled={loading}
        appearance='action'
        to={`/dispensers/${dispenserId}/whitelists`}
      >
        Edit
      </WidgetButtonStyled>
    </Buttons>
  </>
}

const Whitelist: FC<TProps> = ({
  isWhitelisted,
  dispenserId,
  whitelistType,
  toggleWhitelistOn,
  loading: storeLoading
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
      {whitelistType && <ToggleStyled
        value={enabled}
        disabled={loading || storeLoading}
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
      />}
    </Header>
    <WidgetSubtitleStyled>
      You can set up who can claim by whitelisting users by addresses, emails or twitter handles
    </WidgetSubtitleStyled>
    {renderContent(
      dispenserId,
      enabled,
      loading || storeLoading,
      whitelistType
    )}
  </WidgetStyled>
}

export default Whitelist