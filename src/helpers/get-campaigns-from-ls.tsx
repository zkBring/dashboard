import { TCampaignDraft } from 'types'

const getCampaignsFromLS: () => TCampaignDraft[] = () => {
  if (!window.localStorage) { return [] }
  const drafts = window.localStorage.getItem('drafts')
  if (drafts) {
    return JSON.parse(drafts)
  }
  return []
}

export default getCampaignsFromLS
