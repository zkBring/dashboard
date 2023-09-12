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
  Container,
  TableRow,
  TableText,
  TableValue,
  DownloadQRPopup,
  UploadLinksPopup,
  AttentionContainer
} from 'components/pages/common'

const Whitelist: FC<TProps> = ({
  isWhitelisted,
  dispenserId
}) => {
  const [
    enabled, setEnabled
  ] = useState<boolean>(Boolean(isWhitelisted))

  return <WidgetStyled>
    <Header>
      <WidgetTitleStyled>
        Whitelist
      </WidgetTitleStyled>
      <ToggleStyled
        value={enabled}
        onChange={(value => {
          
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
          <TableValue>Anyone can claim</TableValue>
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