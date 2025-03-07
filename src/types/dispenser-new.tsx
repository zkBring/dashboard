import TProofProvider from "./proof_provider"
import TZKTLSService from "./zktls-service"

export type TDispenserNew = {
  title: string
  claim_start?: number | null
  multiscan_qr_id: string

  encrypted_multiscan_qr_enc_code: string
  encrypted_multiscan_qr_secret: string

  campaign_id: string

  web_proof_provider: {
    is_custom: boolean
    data_source: TProofProvider
    service: TZKTLSService
    settings: {
      app_id?: string
      secret?: string
      handle_key?: string
      provider_id?: string
    }
  }
}
