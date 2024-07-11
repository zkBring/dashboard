export type TDispenserStatus = 
  'READY' |
  'ACTIVE' |
  'FINISHED' |
  'NOT_UPLOADED' |
  'PAUSED' |
  'REDIRECT'

export type TDispenserLinks = {
  encrypted_claim_link?: string
  claim_link_id?: string
}[]

export type TDispenserWhitelistType = 'address' | 'email' | 'twitter'
export type TDispenserWhitelistItemAddress = {
  address: string
  dispenser_id: string
  type: TDispenserWhitelistType
}
export type TDispenser = {
  encrypted_multiscan_qr_secret: string
  multiscan_qr_id: string
  dispenser_id?: string  
  links_count?: number
  
  claim_duration?: number
  // not used 

  claim_finish?: number | null
  
  claim_start?: number | null

  timeframe_on?: boolean

  created_at?: string
  title: string
  dynamic?: boolean
  encrypted_multiscan_qr_enc_code: string
  active?: boolean
  redirect_on?: boolean
  redirect_url?: string | null
  links_claimed?: number
  links_assigned?: number
  whitelist_type?: TDispenserWhitelistType
  whitelist?: TDispenserWhitelistItemAddress[]
  whitelist_count?: number
  whitelist_on?: boolean
}

export type TDispenserUpdateData = {
  claim_finish?: number
  claim_start?: number
  title?: string
  dispenser_id: string
}
