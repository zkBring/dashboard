type TPreventPageClose = (message?: string) => () => () => void

const preventPageClose: TPreventPageClose = (message) => {
  return () => {
    window.onbeforeunload = function(e) {
      e.preventDefault()
      const dialogText = message || 'Are you sure?'
      e.returnValue = dialogText;
      return dialogText
    }
    return () => { window.onbeforeunload = () => {} }
  }
}

export default preventPageClose