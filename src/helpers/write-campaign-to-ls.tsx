import { TCampaignDraft } from 'types'

const writeCampaignToLS = (
  drafts: TCampaignDraft[]
) => {
  if (!window.localStorage) { return }
  window.localStorage.setItem('drafts', JSON.stringify(drafts))
}

export default writeCampaignToLS
