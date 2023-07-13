import { convertStringToBytes32 } from './'

const getMinterRole = () => {
  return convertStringToBytes32('MINTER_ROLE')
}

export default getMinterRole