import { TQRItem, TBase64File } from "types"
import QRious from 'qrious'

const convertLinksToBase64 = (
  type: TBase64File,
  qr_array: TQRItem[]
) : string[] => {
  const qrs: string[] = []
  for (let i = 0; i < qr_array.length; i++) {
    const currentQr = new QRious({
      value: qr_array[i].qr_id,
      size: 200
    })
    qrs.push(currentQr.toDataURL(type))
  }
  return qrs
}

export default convertLinksToBase64