import { TQRItem, TBase64File } from "types"
import QRCodeStyling from 'qr-code-styling'
import { decrypt } from 'lib/crypto'
import { CLAIM_APP_QR } from 'configs/app'

const convertLinksToBase64 = async (
  type: TBase64File,  
  qr_array: TQRItem[],
  dashboard_key: string
) : Promise<Blob[]> => {
  const qrs: Blob[] = []
  for (let i = 0; i < qr_array.length; i++) {
    const decrypted_qr_secret = decrypt(qr_array[i].encrypted_qr_secret, dashboard_key)
    const currentQr = new QRCodeStyling({
      data: `${CLAIM_APP_QR}/#/qr/${decrypted_qr_secret}`,
      width: 200,
      height: 200,
      margin: 5,
      cornersSquareOptions: {
        type: 'extra-rounded'
      },
      image: 'https://play-lh.googleusercontent.com/mHjR3KaAMw3RGA15-t8gXNAy_Onr4ZYUQ07Z9fG2vd51IXO5rd7wtdqEWbNMPTgdqrk=w480-h960-rw',
      imageOptions: {
        margin: 5,
        imageSize: 0.6,
        crossOrigin: 'anonymous'
      }
    })
    const blob = await currentQr.getRawData(type)
    if (!blob) { continue }
    qrs.push(blob)
  }
  return qrs
}

export default convertLinksToBase64