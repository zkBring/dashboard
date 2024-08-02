import axios from 'axios'
import { TLink, TCampaignNew } from 'types'

const {
  REACT_APP_SERVER_URL,
  REACT_APP_ZUPLO_API_KEY
} = process.env

const campaignsApi = axios.create({
  baseURL: `${REACT_APP_SERVER_URL}/api/v2/dashboard`,
  headers: {
    Authorization: `Bearer ${REACT_APP_ZUPLO_API_KEY as string}`
  }
})

const requests = {
  create: (
    campaign: TCampaignNew
  ) => campaignsApi.post('/linkdrop/campaigns', {
    ...campaign
  }, { withCredentials: true }),

  get: (chain_id: number | string) => {
    return campaignsApi.get(`/linkdrop/campaigns?chain_id=${chain_id}`, { withCredentials: true })
  },

  updateAvailableCountriesOn: (
    campaign_id: string | number,
    available_countries_on: boolean
  ) => {
    return campaignsApi.patch(`/linkdrop/campaigns/${campaign_id}`, {
      available_countries_on
    }, {
      withCredentials: true
    })
  },

  updatePreferredWalletOn: (
    campaign_id: string | number,
    preferred_wallet_on: boolean
  ) => {
    return campaignsApi.patch(`/linkdrop/campaigns/${campaign_id}`, {
      preferred_wallet_on
    }, {
      withCredentials: true
    })
  },

  updateAvailableCountries: (
    campaign_id: string | number,
    available_countries: string[]
  ) => {
    return campaignsApi.patch(`/linkdrop/campaigns/${campaign_id}`, {
      available_countries
    }, {
      withCredentials: true
    })
  },

  updatePreferredWallet: (
    campaign_id: string | number,
    preferredWallet: string
  ) => {
    return campaignsApi.patch(`/linkdrop/campaigns/${campaign_id}`, {
      wallet: preferredWallet
    }, {
      withCredentials: true
    })
  },

  updateClaimingFinishedButtonOn: (
    campaign_id: string | number,
    claiming_finished_button_on: boolean
  ) => {
    return campaignsApi.patch(`/linkdrop/campaigns/${campaign_id}`, {
      claiming_finished_button_on
    }, {
      withCredentials: true
    })
  },

  updateClaimingFinishedButton: (
    campaign_id: string | number,
    claiming_finished_button_title: string,
    claiming_finished_button_url: string
  ) => {
    return campaignsApi.patch(`/linkdrop/campaigns/${campaign_id}`, {
      claiming_finished_button_title,
      claiming_finished_button_url
    }, {
      withCredentials: true
    })
  },

  getOne: (
    campaign_id: string | number
  ) => {
    return campaignsApi.get(`/linkdrop/campaigns/${campaign_id}`, { withCredentials: true })
  },
  saveBatch: (
    campaign_id: string | number,
    claim_links: TLink[],
    batch_description: string
  ) => {
    return campaignsApi.post(
      `/linkdrop/campaigns/${campaign_id}/save-batch`,
      {
        claim_links,
        batch_description
      },
      { withCredentials: true }
    )
  },
  getBatches: (
    campaign_id: string | number
  ) => {
    return campaignsApi.get(`/linkdrop/campaigns/${campaign_id}/batches`, { withCredentials: true })
  },
  getReport: (
    campaign_id: string | number
  ) => {
    return campaignsApi.get(`/linkdrop/campaigns/${campaign_id}/report`, { withCredentials: true })
  },
  getBatch: (
    campaign_id: string | number,
    batch_id: string | number
  ) => {
    return campaignsApi.get(`/linkdrop/campaigns/${campaign_id}/batches/${batch_id}`, { withCredentials: true })
  }
}

export default requests
