import { TQRItem, TLink }  from 'types'

const mapQRsWithLinks = (qrs: TQRItem[], links: TLink[]): TQRItem[] => {
  const qrArray: TQRItem[] = qrs
  for (let i = 0; i < qrArray.length; i++) {
    qrArray[i].encrypted_claim_link = links[i].encrypted_claim_link
  }
  return qrArray
}

export default mapQRsWithLinks
