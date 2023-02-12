import { TLinksBatch } from "types"

export type TProps = {
  batches: TLinksBatch[]
  campaignId: string
  title: string
  sdk: boolean
  downloadLinks: (batch_id: string | number, campaign_id: string, title: string, encryptionKey?: string) => void
  encryptionKey: string
}