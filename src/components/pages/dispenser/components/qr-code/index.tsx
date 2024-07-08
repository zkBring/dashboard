import QRCodeStyling from 'qr-code-styling'
import { FC, useEffect, useRef } from 'react'
import { TProps } from './types'
import {
  defineClaimAppURL,
  defineQROptions,
  loadImage
} from 'helpers'
import { QRCodeContainer } from './styled-components'

const QRCode: FC<TProps> = ({
  address,
  link
}) => {
  const qrRef = useRef(null)

  useEffect(() => {
    const init = async () => {
      if (!qrRef || !qrRef.current) { return }
      const claimAppURL = defineClaimAppURL(address)
      const qrOption = defineQROptions(address)
      const resp = await fetch(qrOption.icon)
      const blob = await resp.blob()
      const img = await createImageBitmap(blob as ImageBitmapSource)
      // const logoImageLoaded = await loadImage(
      //   qrOption.imageOptions,
      //   qrOption.icon
      // )

      const qrCode = new QRCodeStyling({
        image: qrOption.icon,
        width: 350,
        height: 350,
        data: link,
        cornersSquareOptions: qrOption.cornersSquareOptions,
        cornersDotOptions: qrOption.cornersDotOptions,
        dotsOptions: {
          color: "#9D9D9D",
          type: "dots"
        },
        backgroundOptions: qrOption.backgroundOptions,
        imageOptions: qrOption.imageOptions
      })
      qrCode.append(qrRef.current)
      qrCode.update({ data: link } )

    }

    init()
  }, [])

  return <QRCodeContainer
    ref={qrRef} 
  />
}

export default QRCode