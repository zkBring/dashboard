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
  claim_duration: number
  created_at?: string
  claim_start: number
  title: string
  dynamic?: boolean
  encrypted_multiscan_qr_enc_code: string
  active?: boolean
  redirect_on?: boolean
  redirect_url?: string | null
  links_claimed?: number
  links_assigned?: number
  whitelisted?: boolean
  whitelist_type?: TDispenserWhitelistType
  whitelist?: TDispenserWhitelistItemAddress[]
  whitelist_count?: number
  whitelist_on?: boolean
}

export type TDispenserUpdateData = {
  claim_duration: number
  claim_start: number
  title: string
  dispenser_id: string
}
