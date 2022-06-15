import { TQRItem, TBase64File } from "types"
import QRCodeStyling from 'qr-code-styling'
import LedgerLogo from 'images/ledger.png'

const convertLinksToBase64 = async (
  type: TBase64File,  
  qr_array: TQRItem[]
) : Promise<Blob[]> => {
  const qrs: Blob[] = []
  for (let i = 0; i < qr_array.length; i++) {
    const currentQr = new QRCodeStyling({
      data: qr_array[i].qr_id,
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