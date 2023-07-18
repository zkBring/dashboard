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
  dispenserStatus
}) => {
  if (dispenserStatus === 'NOT_UPLOADED') {
    return null
  }
  return <WidgetStyled title='Statistics'>
    <AsideContent>
      <TableRow>
        <TableText>Total links</TableText>
        <TableValue>100</TableValue>
      </TableRow>
      <TableRow>
        <TableText>Scanned</TableText>
        <TableValue>0</TableValue>
      </TableRow>
      <TableRow>
        <TableText>Links left</TableText>
        <TableValue>0</TableValue>
      </TableRow>
      <TableRow>
        <TableText>Claimed</TableText>
        <TableValue>100</TableValue>
      </TableRow>
    </AsideContent>
    <AsideWidgetButton
      onClick={() => {

      }}
    >
      <Icons.DownloadReportIcon />
      Download full report
    </AsideWidgetButton> 
  </WidgetStyled>
}

export default Statistics