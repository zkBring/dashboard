import { TLinksBatch } from "types"

export type TProps = {
  batches: TLinksBatch[]
  campaignId: string
  title: string
  sdk: boolean
  sponsored: boolean
  downloadLinks: (
    batch_id: string | number,
    campaign_id: string,
    title: string,
    tokenAddress: string | null,
    sponsored: boolean,
    encryptionKey?: string
  ) => void
  encryptionKey: string,
  tokenAddress: string | null,
  linksCreated: number
}