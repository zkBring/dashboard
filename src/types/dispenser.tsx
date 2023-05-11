export type TDispenserStatus = 
  'READY' |
  'ACTIVE' |
  'FINISHED' |
  'NOT_UPLOADED'

export type TDispenserLinks = {
  encrypted_claim_link?: string
  claim_link_id?: string
}[]

export type TDispenser = {
  encrypted_multiscan_qr_secret: string
  multiscan_qr_id: string
  dispenser_id?: string  
  claim_links_count: number
  claim_duration: number
  created_at?: string
  claim_start: string
  status?: TDispenserStatus
  title: string
  encrypted_multiscan_qr_enc_code: string
}


