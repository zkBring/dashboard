import { TLinksBatch, TTokenType } from "types"

export type TCreateReclaimAndAddLinks = (
  mappingPageRedirect: () => void,
  title: string,
  campaignId: string,
  batchId: string,
  tokenAddress: string,
  wallet: string,
  tokenType: TTokenType,
  customClaimHost: string,
  customClaimHostOn: boolean,
  successCallback?: (
    dispenser_id: string | number
  ) => void,
  errorCallback?: () => void,
) => void

export type TProps = {
  batches: TLinksBatch[]
  campaignId: string
  title: string
  sdk: boolean
  sponsored: boolean
  tokenType: TTokenType
  wallet: string
  loading: boolean
  customClaimHost: string
  customClaimHostOn: boolean
  createReclaimAndAddLinks: TCreateReclaimAndAddLinks
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