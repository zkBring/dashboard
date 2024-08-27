import { TLinksBatch } from "types"

export type TCreateDispenserAndAddLinks = (
  title: string,
  dynamic: boolean,
  campaignId: string,
  batchId: string,
  tokenAddress: string,
  wallet: string,
  successCallback?: (id: string | number) => void
) => void

export type TProps = {
  batches: TLinksBatch[]
  campaignId: string
  title: string
  sdk: boolean
  sponsored: boolean
  wallet: string
  loading: boolean
  createDispenserAndAddLinks: TCreateDispenserAndAddLinks
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