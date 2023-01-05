import { TLinkDecrypted, TLinkContent } from "types"

const downloadAssetsAsCSV = (
  arr: TLinkContent[],
  title: string
) => {
  const header = [ 'Token ID', 'Token amount', 'Links amount' ]
  const values = arr.map(item => {
    return [
      item.tokenId, item.tokenAmount, item.linksAmount
    ]
  })
  const data = [header, ...values].join("\n")
  const hiddenElement = document.createElement('a')
  hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(data)
  hiddenElement.target = '_blank'
  hiddenElement.download = `${title}.csv`
  document.body.appendChild(hiddenElement)
  hiddenElement.click()
  const body = hiddenElement.closest('body')
  if (!body) { return }
  body.removeChild(hiddenElement)
}

export default downloadAssetsAsCSV
