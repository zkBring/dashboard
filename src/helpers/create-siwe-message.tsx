import { SiweMessage } from 'siwe'

const scheme = window.location.protocol.slice(0, -1)
const domain = window.location.host
const origin = window.location.origin

function createSiweMessage (
  address: string,
  statement: string,
  chainId: number
) {
  const message = new SiweMessage({
    scheme,
    domain,
    address,
    statement,
    uri: origin,
    version: '1',
    chainId
  })
  return message.prepareMessage()
}

export default createSiweMessage