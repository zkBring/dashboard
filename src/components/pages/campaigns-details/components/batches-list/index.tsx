import { FC, useState } from 'react'
import {
  TProps,
  TCreateDispenserAndAddLinks
} from './types'
import {
  BatchList,
  BatchListLabel,
  BatchListValue,
  Container,
  NewDispenserPopup
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
import {
  ClipboardCopy,
  BatchId,
  LoaderStyled,
  Buttons
} from './styled-components'
import Icons from 'icons'

const defineDispenserTypes = (
  closePopup: () => void,
  createDispenserAndAddLinks: TCreateDispenserAndAddLinks,
  campaignId: string,
  batchId: string,
  tokenAddress: string,
  wallet: string,
  successCallback: () => void
) => {
  return [
    {
      title: 'Dynamic QR for electronic displays',
      text: 'A web page with an auto-refresh QR code that updates in real time. This ensures secure distribution, preventing a single user from claiming all tokens',
      onClick: () => {
        closePopup()
        createDispenserAndAddLinks(
          'Campaign',
          true,
          campaignId,
          batchId,
          tokenAddress,
          wallet,
          successCallback
        )
      },
      image: <Icons.DynamicQRPreviewIcon />
    }, {
      title: 'Printable Dispenser QR code',
      text: 'A single QR code that dispenses tokens one-by-one to users after they scan it. Ideal for controlled and sequential token distribution',
      onClick: () => {
        createDispenserAndAddLinks(
          'Campaign',
          false,
          campaignId,
          batchId,
          tokenAddress,
          wallet,
          successCallback
        )
      },
      image: <Icons.DispenserQRPreviewIcon />
    }, {
      title: 'Printable Set of QR codes',
      text: 'A set of single-claim QR codes. Each QR code is valid for one claim only, and becomes invalid after being scanned and claimed by a user',
      onClick: () => {
        alert('QR SET')
      },
      image: <Icons.QRSetPreviewIcon />
    }
  ]
}

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
  loading,
  downloadLinks,
  tokenAddress,
  encryptionKey,
  sponsored,
  linksCreated,
  wallet,
  createDispenserAndAddLinks
}) => {

  if (linksCreated === 0) {
    return <span>No links have been created yet.</span>
  }

  const [
    showPopup,
    setShowPopup
  ] = useState<boolean | string>(false)

  const dispenserOptions = defineDispenserTypes(
    () => setShowPopup(false),
    createDispenserAndAddLinks,
    campaignId,
    String(showPopup),
    tokenAddress as string,
    wallet,
    () => alert('sss')
  )

  return <>
    {showPopup && <NewDispenserPopup
      dispenserOptions={dispenserOptions}
      title='Create QR campaign'
      subtitle='Start new QR campaign to distribute your tokens by choosing the method that best suits your needs:'
      onClose={() => {
        setShowPopup(false)
      }}
    />}
  
    <Container>
      {loading ? <LoaderStyled /> : <BatchList>
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
            <Buttons>
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

              {false && <WidgetButton
                appearance='additional'
                disabled={batch.claim_links_count === 0}
                size='extra-small'
                title='Distribute'
                onClick={() => {
                  setShowPopup(batch.batch_id)
                }}
              />}
            </Buttons>
            
          </>
        })}
      </BatchList>}
      
    </Container>
  </>
}

export default BatchesList