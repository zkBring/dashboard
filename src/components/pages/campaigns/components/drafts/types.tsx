import { TCampaignDraft } from "types"

export type TProps = {
  drafts: TCampaignDraft[]
  openDraft: (
    id: string,
    callback: () => void
  ) => void,
  deleteDraft: (
    id: string
  ) => void
}