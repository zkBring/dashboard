import { FC, useState } from 'react'
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


const BatchIdContainer: FC<{batchId: string}> = ({ batchId }) => {
  const [ copied, setCopied ] = useState<boolean>(false)
  return <BatchId onClick={() => {
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 3000)
    copyToClipboard({ value: batchId })
  }}>
    {shortenString(batchId)}
    <ClipboardCopy>
      {copied ? <Icons.ClipboardCopiedIcon /> : <Icons.ClipboardCopyIcon /> }
    </ClipboardCopy>
  </BatchId>
}

const BatchesList: FC<TProps> = ({
  batches,
  campaignId,
  title,
  sdk,
  downloadLinks,
  tokenAddress,
  encryptionKey,
  sponsored,
  linksCreated
}) => {

  if (linksCreated === 0) {
    return <span>No links have been created yet.</span>
  }
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
          <BatchIdContainer batchId={batch.batch_id} />
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