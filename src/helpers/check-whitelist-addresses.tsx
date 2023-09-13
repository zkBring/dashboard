const checkWhitelistAddresses = (data: string): boolean => {
  const recipients = data.split('\n')
  let isValid = recipients.every(item => {
      return item.length === 42 
    })

  return isValid
}

export default checkWhitelistAddresses
