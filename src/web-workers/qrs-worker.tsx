/* gobal OffscreenCanvas */
import { expose } from 'comlink'
import { TQROption, TLinkDecrypted } from 'types'
import * as wccrypto from '@walletconnect/utils'
import { ethers } from 'ethers'
import { decrypt, encrypt } from 'lib/crypto'
import QRCodeStyling from 'qr-code-styling-bigmac'

export class QRsWorker {
  private cb: (value: number) => void;
  private currentPercentageFinished: number = 0;
  public constructor(
    cb: (value: number) => void
  ) {
    this.cb = cb
  }

  public async downloadMultiQR (
    data: string,
    width: number,
    height: number,
    logoImageWidth: number,
    logoImageHeight: number,
    img: ImageBitmap,
    qrOption: TQROption
  ) {
    let qrs: Blob[] = []

    
    const qrCode = new QRCodeStyling({
      data,
      width,
      height,
      margin: width / 60,
      type: 'canvas',
      cornersSquareOptions: qrOption.cornersSquareOptions,
      cornersDotOptions: qrOption.cornersDotOptions,
      dotsOptions: qrOption.dotsOptions,
      backgroundOptions: qrOption.backgroundOptions,
      image: img,
      imageOptions: qrOption.imageOptions,
      logoImageWidth,
      logoImageHeight
    })

    const blob = await qrCode.getRawData('png')
    if (blob) {
      qrs.push(blob)
    }
    return qrs
  }

  public prepareLinksForDispenser (
    encrypted_multiscan_qr_enc_code: string,
    links: TLinkDecrypted[],
    dashboard_key: string,
  ) {
    const result = []
    // const multiscanQREncCode = decrypt(encrypted_multiscan_qr_enc_code, dashboard_key)
    const multiscanQREncCode = encrypted_multiscan_qr_enc_code

    for (let i = 0; i < links.length; i++) {
      const claim_link = links[i].claim_link
      const linkKey = ethers.utils.id(multiscanQREncCode)
      const link = {
        encrypted_claim_link: encrypt(claim_link, linkKey.replace('0x', '')),
        link_id: links[i].link_id
      }
      result.push(link)
      const percentageFinished = Math.round(i / links.length * 100) / 100
      if (this.currentPercentageFinished < percentageFinished) {
        this.currentPercentageFinished = percentageFinished
        this.cb(this.currentPercentageFinished)
      }
    }
    this.currentPercentageFinished = 0
    return result
  }
}

expose(QRsWorker)