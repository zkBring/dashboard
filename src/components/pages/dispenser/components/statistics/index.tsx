import { FC } from 'react'
import { WidgetStyled } from './styled-components'
import {
  TableRow,
  TableText,
  TableValue
} from 'components/pages/common'
import {
  AsideContent,
  AsideWidgetButton
} from '../../styled-components'
import Icons from 'icons'
import { TProps } from './types'

const Statistics: FC<TProps> = ({
  dispenserStatus,
  linksCount,
  linksAssigned,
  linksClaimed,
  downloadReport
}) => {
  if (dispenserStatus === 'NOT_UPLOADED') {
    return null
  }
  return <WidgetStyled title='Statistics'>
    <AsideContent>
      <TableRow>
        <TableText>Total links</TableText>
        <TableValue>{linksCount}</TableValue>
      </TableRow>
      <TableRow>
        <TableText>Scanned</TableText>
        <TableValue>{linksAssigned}</TableValue>
      </TableRow>
      <TableRow>
        <TableText>Links left</TableText>
        <TableValue>{linksCount - linksAssigned}</TableValue>
      </TableRow>
      <TableRow>
        <TableText>Claimed</TableText>
        <TableValue>{linksClaimed}</TableValue>
      </TableRow>
    </AsideContent>
    <AsideWidgetButton
      onClick={() => {
        downloadReport()
      }}
    >
      <Icons.DownloadReportIcon />
      Download full report
    </AsideWidgetButton> 
  </WidgetStyled>
}

export default Statistics