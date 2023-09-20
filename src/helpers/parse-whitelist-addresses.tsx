import { checkWhitelistAddresses } from './index'

const parseWhitelistAddresses = (data: string) => {
  if (!data) {
    return null
  }
  const recipientsFormatValid = checkWhitelistAddresses(data)
  if (!recipientsFormatValid) {
    return null
  }
  const recipients = data.split('\n')

  return recipients
}

export default parseWhitelistAddresses
