const copyToClipboard = ({ value }: { value: Record<string, any> }) => {
  let textArea: HTMLTextAreaElement
  function isOS () {
    return navigator.userAgent.match(/ipad|iphone/i)
  }

  function createTextArea (data: Record<string, any>) {
    textArea = document.createElement('textarea')
    const value = Object.keys(data).reduce((sum, item, idx, arr) => {
      if (idx === 0) {
        sum = '{'
      } else {
        sum = `${sum},`
      }
      sum = `${sum} ${item}: ${data[item]}`
      if (idx === arr.length - 1) {
        sum = `${sum} }`
      }
      return sum
    }, '')

    console.log({ value })

    textArea.value = value

    textArea.style.position = 'fixed'
    textArea.style.left = '50%'
    textArea.style.top = '50%'
    textArea.style.transform = 'translate(-50%, -50%)'
    textArea.onfocus = (e) => {
      e.preventDefault()
    }
    document.body.appendChild(textArea)
  }

  function selectText () {
    var range,
    selection

    if (isOS()) {
      range = document.createRange()
      range.selectNodeContents(textArea)
      selection = window.getSelection()
      if (!selection) return
      selection.removeAllRanges()
      selection.addRange(range)
      textArea.setSelectionRange(0, 999999)
    } else {
      textArea.select()
    }
  }

  function copyToClipboard () {
    document.execCommand('copy')
    textArea.blur()
    document.body.removeChild(textArea)
  }

  createTextArea(value)
  selectText()
  copyToClipboard()
}


export default copyToClipboard