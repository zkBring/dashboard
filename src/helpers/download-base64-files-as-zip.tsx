import { TBase64File } from "types"
import JSZip from 'jszip'
import { saveAs } from '@progress/kendo-file-saver'

const defineFileExtension: (type: TBase64File) => string = (type) => {
  switch (type) {
    case 'jpeg':
    case 'jpg':
      return 'jpg'
    case 'png':
      return 'png'
    case 'svg':
      return 'svg'
    case 'csv':
      return 'csv'
    default:
      return ''
  }
}

const downloadBase64FilesAsZip = async (
  type: TBase64File,
  base64Files: Blob[],
  data: any[],
  zipFileName: string = 'example',
  index: number
) : Promise<void> => {
  const jszip = new JSZip();
  for(let i = 0; i < base64Files.length; i++) {
    const fileName = `qr-${index + i}.${defineFileExtension(type)}`
    jszip.file(fileName, base64Files[i])
    data[i].fileName = fileName
  }

  const dataHeader = Object.keys(data[0]).join(",")
  const values = data.map(item => {
    return Object.values(item).join(",")
  })
  const dataFormatted = [dataHeader, ...values].join("\n")
  const dataBlob = new Blob([decodeURIComponent('%ef%bb%bf') /*prepend bom*/, dataFormatted], {type: 'text/csv;charset=utf-8'})
  jszip.file(`data.${defineFileExtension('csv')}`, dataBlob)

  const content = await jszip.generateAsync({ type: 'blob' })
    // see FileSaver.js
  return saveAs(content, `${zipFileName}.zip`)
}

export default downloadBase64FilesAsZip