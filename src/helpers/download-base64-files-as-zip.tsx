import { TBase64File } from "types"
import JSZip from 'jszip'
import { saveAs } from '@progress/kendo-file-saver'

const defineFileExtension: (type: TBase64File) => string = (type) => {
  switch (type) {
    case 'image/jpeg':
    case 'image/jpg':
      return 'jpg'
    case 'image/png':
      return 'png'
    case 'image/svg+xml':
      return 'svg'
    default:
      return ''
  }
}

const downloadBase64FilesAsZip = (
  type: TBase64File,
  base64Files: string[],
  zipFileName: string = 'example'
) : void => {
  const jszip = new JSZip();
  for(let i = 0; i < base64Files.length; i++) {
    const binary = atob(base64Files[i].split(',')[1])
    const array = [];
    for (let j = 0; j < binary.length; j++) {
      array.push(binary.charCodeAt(j));
    }
    let image = new Blob([new Uint8Array(array)], {
        type
    });
    jszip.file(`qr-${i}.${defineFileExtension(type)}`, image)
  }
  jszip.generateAsync({ type: 'blob' }).then(function(content) {
    // see FileSaver.js
    saveAs(content, `${zipFileName}.zip`)
  })
}

export default downloadBase64FilesAsZip