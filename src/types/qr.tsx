export type TQRStatus = 
  'NOT_SENT_TO_PRINTER' |
  'SENT_TO_PRINTER' |
  'ON_ITS_WAY_TO_WAREHOUSE' |
  'BEING_INSERTED_TO_BOXES' |
  'READY_TO_SHIP' |
  'SHIPPING' |
  'SHIPPED'

export type TQRItem = {
  qr_id: string,
  encrypted_qr_secret: string,
  encrypted_claim_link?: string,
}

export type TQRSet = {
  set_name: string,
  qr_quantity: number,
  status: TQRStatus,
  set_id?: number | string,
  creator_address: string,
  created_at?: string,
  qr_array?: TQRItem[],
  links_uploaded?: boolean,
  updated_at?: string
}
