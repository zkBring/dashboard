import { FC, useState } from 'react'
import {
  TProps,
  TCreateReclaimAndAddLinks
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
import { useHistory } from 'react-router-dom'
import { TLinksBatch, TTokenType } from 'types'

const defineDispenserTypes = (
  createReclaimAndAddLinks: TCreateReclaimAndAddLinks,
  campaignId: string,
  batchId: string,
  tokenAddress: string,
  wallet: string,
  tokenType: TTokenType,
  customClaimHost: string,
  customClaimHostOn: boolean,
  campaignTitle: string,

  reclaimMappingPageRedirect: () => void,

  successCallbackForReclaim?: (
    dispenser_id: string | number
  ) => void,

  errorCallback?: () => void,
) => {
  return [
    {
      title: 'Web2 Retrodrop',
      text: 'Share tokens with any regular website users (Twitter/Github/Reddit/your website). Powered by Reclaim Protocol. Learn more at https://www.reclaimprotocol.org/',
      onClick: () => {
        createReclaimAndAddLinks(
          reclaimMappingPageRedirect,
          `Reclaim set for ${campaignTitle}`,
          campaignId,
          batchId,
          tokenAddress,
          wallet,
          tokenType,
          customClaimHost,
          customClaimHostOn,
          successCallbackForReclaim
        )
      },
      image: <Icons.DispenserQRPreviewIcon />
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

const defineDistributeButton = (
  batch: TLinksBatch,
  setShowPopup: (batchId: string) => void
) => {
  if (batch.qr_campaign) {
    if (batch.qr_campaign_type === 'QR_SET') {
      return <ButtonStyled
        appearance='additional'
        size='extra-small'
        title='QR Set'
        to={`/qrs/${batch.qr_campaign}`}
      />
    }

    if (batch.qr_campaign_type === 'DISPENSER') {
      return <ButtonStyled
        appearance='additional'
        size='extra-small'
        title='Dispenser'
        to={`/dispensers/${batch.qr_campaign}`}
      />
    }

    if (batch.qr_campaign_type === 'RECLAIM') {
      return <ButtonStyled
        appearance='additional'
        size='extra-small'
        title='Reclaim'
        to={`/reclaims/${batch.qr_campaign}`}
      />
    }

    if (batch.qr_campaign_type === 'DYNAMIC_DISPENSER') {
      return <ButtonStyled
        appearance='additional'
        size='extra-small'
        title='Dynamic'
        to={`/dynamic-qrs/${batch.qr_campaign}`}
      />
    }
  }
  return <ButtonStyled
    appearance='action'
    disabled={batch.claim_links_count === 0}
    size='extra-small'
    title='Distribute'
    onClick={() => {
      setShowPopup(batch.batch_id)
    }}
  />
}

const BatchesList: FC<TProps> = ({
  batches,
  campaignId,
  title,
  sdk,
  loading,
  downloadLinks,
  customClaimHost,
  customClaimHostOn,
  tokenAddress,
  encryptionKey,
  sponsored,
  linksCreated,
  wallet,
  tokenType,
  createReclaimAndAddLinks
}) => {

  const history = useHistory()

  if (linksCreated === 0) {
    return <span>No links have been created yet.</span>
  }

  const [
    showPopup,
    setShowPopup
  ] = useState<boolean | string>(false)

  const dispenserOptions = defineDispenserTypes(
    createReclaimAndAddLinks,
    campaignId,
    String(showPopup),
    tokenAddress as string,
    wallet,
    tokenType,
    customClaimHost,
    customClaimHostOn,
    title,

    () => {
      history.push(`/campaigns/${campaignId}/dispenser/generate`)
    },

    (
      reclaim_id: string | number
    ) => {
      setShowPopup(false)
      return history.push(`/reclaims/${reclaim_id}?settings_open=reclaim`)
    },
    () => {
      setShowPopup(false)
      return history.push(`/campaigns/${campaignId}`)
    },

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
                batch,
                setShowPopup
              )}
            </Buttons>
            
          </>
        })}
      </BatchList>}
      
    </Container>
  </>
}

export default BatchesList