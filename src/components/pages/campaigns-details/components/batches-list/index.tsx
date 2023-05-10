import { FC } from 'react'
import { TProps } from './types'
import {
  BatchList,
  BatchListLabel,
  BatchListValue,
} from 'components/pages/common'
import {
  formatTime,
  formatDate,
  copyToClipboard,
  shortenString
} from 'helpers'
import {
  WidgetButton,
  SecondaryTextSpan
} from '../../styled-components'
import { ClipboardCopy, BatchId } from './styled-components'
import Icons from 'icons'

const BatchesList: FC<TProps> = ({
  batches,
  campaignId,
  title,
  sdk,
  downloadLinks,
  tokenAddress,
  encryptionKey,
  sponsored
}) => {
  if (!batches || batches.length === 0) {
    return null
  }
  return <BatchList>
    <BatchListLabel>#</BatchListLabel>
    <BatchListLabel>Batch ID</BatchListLabel>
    
    <BatchListLabel>Created at</BatchListLabel>
    <BatchListLabel>Links</BatchListLabel>
    <BatchListLabel></BatchListLabel>
    {batches && batches.map((batch, idx) => {
      const dateFormatted = formatDate(batch.created_at || '')
      const timeFormatted = formatTime(batch.created_at || '')
      return <>
        <BatchListValue>
          {idx + 1}
        </BatchListValue>
        <BatchListValue>
          <BatchId onClick={() => {
            copyToClipboard({ value: batch.batch_id })
          }}>
            {shortenString(batch.batch_id)}
            <ClipboardCopy><Icons.ClipboardCopyIcon /></ClipboardCopy>
          </BatchId>
        </BatchListValue>


        
        <BatchListValue>
          {dateFormatted} <SecondaryTextSpan>{timeFormatted}</SecondaryTextSpan>
        </BatchListValue>
        <BatchListValue>
          {batch.claim_links_count}
        </BatchListValue>
        <WidgetButton
          appearance='action'
          disabled={batch.claim_links_count === 0}
          size='extra-small'
          title='Download'
          onClick={() => {
            downloadLinks(
              batch.batch_id,
              campaignId,
              title,
              tokenAddress,
              Boolean(sponsored),
              sdk ? encryptionKey : undefined
            )
          }}
        />
      </>
    })}
  </BatchList>
}

export default BatchesList