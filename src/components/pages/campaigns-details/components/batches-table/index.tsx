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
  copyToClipboard
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
  encryptionKey
}) => {
  if (!batches || batches.length === 0) {
    return null
  }
  return <BatchList>
    <BatchListLabel>{sdk ? 'Batch ID' : 'Batch'}</BatchListLabel>
    <BatchListLabel>Links</BatchListLabel>
    <BatchListLabel>Created at</BatchListLabel>
    <BatchListLabel></BatchListLabel>
    {batches && batches.map((batch, idx) => {
      const dateFormatted = formatDate(batch.created_at || '')
      const timeFormatted = formatTime(batch.created_at || '')
      return <>
        <BatchListValue>
          {sdk ? <BatchId onClick={() => {
            copyToClipboard({ value: batch.batch_id })
          }}>
            {batch.batch_id}
            <ClipboardCopy><Icons.ClipboardCopyIcon /></ClipboardCopy>
          </BatchId> :  `#${idx + 1}`}
        </BatchListValue>
        <BatchListValue>
          {batch.claim_links_count}
        </BatchListValue>
        <BatchListValue>
          {dateFormatted} <SecondaryTextSpan>{timeFormatted}</SecondaryTextSpan>
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
              Boolean(batch.sponsored),
              sdk ? encryptionKey : undefined
            )
          }}
        />
      </>
    })}
  </BatchList>
}

export default BatchesList