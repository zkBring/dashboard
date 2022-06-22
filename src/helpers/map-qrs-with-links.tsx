import { TQRItem, TLinkDecrypted }  from 'types'
import { decrypt, encrypt } from 'lib/crypto'

const mapQRsWithLinks = (
  qrs: TQRItem[],
  links: TLinkDecrypted[],
  dashboard_key: string
): TQRItem[] => {
  const qrArray: TQRItem[] = qrs
  for (let i = 0; i < qrArray.length; i++) {
    const decrypted_qr_secret = decrypt(qrArray[i].encrypted_qr_secret, dashboard_key)
    const claim_link = links[i].claim_link
    qrArray[i].encrypted_claim_link = encrypt(claim_link, decrypted_qr_secret)
  }
  
  return qrArray
}

export default mapQRsWithLinks
