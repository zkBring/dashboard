import { TLinkDecrypted, TLinkContent, TTokenType } from "types"

const downloadAssetsBlankCSV = (
  type: TTokenType | null,
  title: string
) => {

  let header
  if (type === 'ERC20') {
    header = [ 'Token amount', 'Links amount' ]
  }
  if (type === 'ERC721') {
    header = [ 'Token ID' ]
  }
  if (type === 'ERC1155') {
    header = [ 'Token ID', 'Token amount', 'Links amount' ]
  }
  const data = [header].join("\n")
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

export default downloadAssetsBlankCSV
