import { FC, useState } from 'react'
import {
  TProps
} from './types'
import {
  BatchList,
  BatchListLabel,
  BatchListValue
} from 'components/pages/common'
import {
  formatTime,
  formatDate,
  copyToClipboard,
  shortenString
} from 'helpers'
import {
  SecondaryTextSpan
} from '../../styled-components'
import {
  ClipboardCopy,
  BatchId,
  LoaderStyled,
  Buttons,
  ButtonStyled,
  ButtonIcon
} from './styled-components'
import Icons from 'icons'
import { TLinksBatch } from 'types'

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

const defineDistributeButton = (
  batch: TLinksBatch
) => {
  if (batch.qr_campaign) {
    if (batch.qr_campaign_type === 'RECLAIM') {
      return <ButtonStyled
        appearance='additional'
        size='extra-small'
        title='Reclaim'
        to={`/reclaims/${batch.qr_campaign}`}
      />
    }
  }
  return null
}

const BatchesList: FC<TProps> = ({
  batches,
  campaignId,
  title,
  sdk,
  loading,
  downloadLinks,
  tokenAddress,
  encryptionKey,
  sponsored,
  linksCreated
}) => {

  if (linksCreated === 0) {
    return <span>No links have been created yet.</span>
  }

  return loading ? <LoaderStyled /> : <BatchList>
    <BatchListLabel>#</BatchListLabel>
    <BatchListLabel>Batch ID</BatchListLabel>
    
    <BatchListLabel>Created at</BatchListLabel>
    <BatchListLabel>Links</BatchListLabel>
    <BatchListLabel>Distribution</BatchListLabel>
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
        <Buttons>
          <ButtonStyled
            appearance='additional'
            disabled={batch.claim_links_count === 0}
            size='extra-small'
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
          >
            <ButtonIcon>
              <Icons.DownloadFileIcon />
            </ButtonIcon>
            CSV
          </ButtonStyled>

          {defineDistributeButton(
            batch
          )}
        </Buttons>
        
      </>
    })}
  </BatchList>
}

export default BatchesList